import create from 'zustand';
import Layout from '../components/Layout';
import axios from 'axios';

import {
    useDropzone
} from 'react-dropzone';
import React, { useRef } from 'react';

type FormState = {
    editStatus: string
    status: string
    newProfile: boolean
    submitted: boolean
    userToken: number
    formData: any
    setEditStatus: (status: string) => void
    setStatus: (status: string) => void
    setEditProfile: (isSet: boolean) => void
    setSubmitted: (isSet: boolean) => void
    setUserToken: (token: number) => void
    setFormData: (data: any) => void
}
// Create store with Zustand
const useStore = create < FormState > (set => ({
    editStatus: '',
    status: '',
    newProfile: false,
    submitted: false,
    userToken: 0,
    formData: null,
    setEditStatus: (status: string) => set({
        editStatus: status
    }),
    setStatus: (status: string) => set({
        status
    }),
    setEditProfile: (isSet: boolean) => set({
        newProfile: isSet
    }),
    setSubmitted: (isSet: boolean) => set({
        submitted: isSet
    }),
    setUserToken: (token: number) => set({ 
        userToken: token
    }),
    setFormData: (data: any) => set({
        formData: data
    })
}));
export default function GetInvolved() {

    const functionUrl = process.env.NEXT_PUBLIC_AZURE_FUNCTION_URI || 'https://elab-initiatives-api.azurewebsites.net/api';
    const editFormRef = useRef<HTMLFormElement>(null);
    const status = useStore(state => state.status);
    const editStatus = useStore(state => state.editStatus);
    const submitted = useStore(state => state.submitted);
    const userToken = useStore(state => state.userToken);
    const formData = useStore(state => state.formData);

    const setStatus = useStore(state => state.setStatus);
    const setEditStatus = useStore(state => state.setEditStatus);
    // const setEditProfile = useStore(state => state.setEditProfile);
    const setSubmitted = useStore(state => state.setSubmitted);
    const setUserToken = useStore(state => state.setUserToken);
    const setFormData = useStore(state => state.setFormData);

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
    } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': []
        },
        maxFiles: 1,
    });
    const acceptedFileItems = acceptedFiles.map(file => ( <li key = {file.name} > {
            file.name
        } 
        </li>
    ));
    const SubmitProfile = async (e: React.FormEvent < HTMLFormElement >, mode: string) => {
        const edit = mode === 'edit';
        const url = edit ? `${functionUrl}/orchestrators/UserEditOrchestrator` :
                                      `${functionUrl}/orchestrators/UserCreateOrchestrator`;
        let form = e.target as HTMLFormElement;
        
        e.preventDefault();

        try {
            const reader = new FileReader();
            const makeRequest = async (img: string | ArrayBuffer | null = null) => {
                try {

                    const params = new URLSearchParams();
                    if(edit)
                        params.append('token', (form.querySelector('#token') as HTMLInputElement).value);
                    
                    params.append('name', (form.querySelector('#name') as HTMLInputElement).value);
                    // TODO: email
                    // params.append('email', (form.querySelector('#email') as HTMLInputElement).value);
                    params.append('title', (form.querySelector('#title') as HTMLInputElement).value);
                    params.append('blurb', (form.querySelector('#blurb') as HTMLInputElement).value);
                    params.append('remembrance', (form.querySelector('#remembrance') as HTMLInputElement).value);

                    if(img)
                        params.append('img', img as string);

                    const requestResult = await axios.post(url, params);

                    // Request was accepted
                    if (requestResult.status === 202) {

                        const getUpdate = () => {setTimeout(async () => {     
                            const requestUpdate = await axios.get(requestResult.data.statusQueryGetUri);

                            if(requestUpdate.data.runtimeStatus === 'Pending') {
                                // Try to get update in a bit
                                getUpdate();
                                return;
                            }
                            else if(requestUpdate.data.runtimeStatus === 'Completed') {
                                setUserToken(requestUpdate.data.customStatus);
                                setStatus('success');
                    
                                if(edit) setEditStatus('success');
                                
                                return;
                            }
                            else if(requestUpdate.data.runtimeStatus === 'Failed') {
                                setStatus('error');
                                if(edit) setEditStatus('error');
                                return;
                            }
                        }, 3000)}

                        // Get durable function status after a bit of time
                        getUpdate();
                    }

                } catch (err) {
                    setSubmitted(false);
                    setStatus('error');
                    if(edit) setEditStatus('error');
                }
            }

            reader.onabort = () => {
                setStatus('error');
                if(edit) setEditStatus('error');
            };
            reader.onerror = () => {
                setStatus('error');
                if(edit) setEditStatus('error');
            };
            reader.onload = async () => {
                makeRequest(reader.result);
            }

            if(acceptedFiles.length === 0 && mode === 'new') {
                setStatus('image');
                return;
            }
            setSubmitted(true);

            if(acceptedFiles[0])
                reader.readAsDataURL(acceptedFiles[0])
            else if(mode === 'edit')
                makeRequest();
        } catch (err) {
            console.error(err);
            setStatus('error');
            if(edit) setEditStatus('error');
            setSubmitted(false);
        }
    }
    const SubmitUserToken = async (e: React.FormEvent < HTMLFormElement > ) => {
        let form = e.target as HTMLFormElement;
        const token = (form.querySelector('#token') as HTMLInputElement).value;

        e.preventDefault();
        setEditStatus('code');

        try {            
            const requestResult = await axios.get(`${functionUrl}/PersonProfileGet?token=${token}`);

            // No user 
            if(requestResult.status === 204) {
                setEditStatus('no_user');
            }
            // Request was successful
            else if (requestResult.status === 200) {
                setEditStatus('form');
                setStatus('hide');
                setFormData(requestResult.data)
                setUserToken(parseInt(token));

            }
        } catch (err) {
            console.error(err);
            setEditStatus('error');
        }
    }

  return (
    <Layout>
        <div className="container relative mt-14 mb-24 xl:mt-16 px-4 xl:px-8 w-full lg:w-7/12 z-10">

            <div className="mb-14 xl:flex xl:w-3/5">
                <div className="w-full">

                    {(status !== 'success' && editStatus !== 'form') &&
                        <form onSubmit={SubmitUserToken}>
                            <h3 className="text-1xl text-bluegreen">Have a profile?</h3>
                            <h2 className="text-2xl text-bluegreen font-semibold mb-8">Enter your access token!</h2>
                            <div>
                                <div className='flex flex-col'>
                                    <input type='text' placeholder="YOUR TOKEN" name="token" id="token" width="200"
                                        aria-label="Enter your full token" minLength={6} maxLength={6} required
                                        disabled={editStatus==='submitted' } className={`bg-lynx placeholder:text-bluegreen
                                        py-4 px-4 border-2 max-w-[200px] rounded-full transition-all ${editStatus=='no_user'
                                        ? 'border-[#F4B477]' : 'border-bluegreen' }`} />

                                    {editStatus !== 'submitted' ?
                                    <div>
                                    <input type="submit" value="Submit your token" name="submit" aria-hidden="true" className='hidden' />
                                    <button className={`inline-block rounded-full px-10 py-2 mt-4 uppercase border-2
                                        border-oasis text-purple text-sm lg:text-lg max-w-[200px] transition-all
                                        hover:bg-oasis`}>
                                        Next
                                    </button>
                                    </div>
                                    :
                                    // Loading
                                    <svg width="60" height="24" viewBox="0 0 60 24" xmlns="http://www.w3.org/2000/svg"
                                        fill="#026670">
                                        <circle cx="6" cy="12" r="3">
                                            <animate attributeName="r" from="3" to="3" begin="0s" dur="1s" values="3;6;3"
                                                calcMode="linear" repeatCount="indefinite" />
                                            <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="1s"
                                                values="1;.5;1" calcMode="linear" repeatCount="indefinite" />
                                        </circle>
                                        <circle cx="24" cy="12" r="3">
                                            <animate attributeName="r" from="3" to="3" begin="0s" dur="1s" values="6;3;6"
                                                calcMode="linear" repeatCount="indefinite" />
                                            <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="1s"
                                                values="1;.5;1" calcMode="linear" repeatCount="indefinite" />
                                        </circle>
                                        <circle cx="42" cy="12" r="3">
                                            <animate attributeName="r" from="3" to="3" begin="0s" dur="1s" values="3;6;3"
                                                calcMode="linear" repeatCount="indefinite" />
                                            <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="1s"
                                                values="1;.5;1" calcMode="linear" repeatCount="indefinite" />
                                        </circle>
                                    </svg>
                                    }
                                </div>
                            </div>
                            {/* {status === 'edit' &&
                            } */}
                            {editStatus === 'no_user' &&
                            <span className='text-[#F4B477]'>
                                No user with this token was found.
                            </span>
                            }
                            {/* {editStatus === 'error' &&
                            <span className='text-green-blue'>
                                Sorry, there was a problem. Try again later, please.
                            </span>
                            } */}
                        </form>
                    }
                        {editStatus === 'form' &&
                    <form id="edit" ref={editFormRef} onSubmit={e => SubmitProfile(e, 'edit')}>

                            <div>
                                <h3 className="text-2xl text-bluegreen font-semibold mb-8">Edit your profile</h3>
                                <div className='flex flex-col'>
                                    <p>*Required</p>

                                    <input type='hidden' aria-hidden='true' name='token' id='token' value={userToken} />
                                    <p className='text-purple font-semibold'>First and last name you'd like displayed, including
                                        preferred prefix or suffixes*</p>
                                    <input type='text' placeholder="YOUR NAME*" name="name" id="name" width="800"
                                        aria-label="Enter your full name" minLength={5} required disabled={submitted}
                                        defaultValue={formData['name']} className="w-full bg-lynx placeholder:text-bluegreen py-4 px-4 border-2 rounded-full
                                            transition-all border-bluegreen" />
                                    <p className='text-purple font-semibold'>Title and Organization/affiliation you'd
                                        like listed (if applicable)*</p>

                                    <input type='text' placeholder="YOUR TITLE*" name="title" id="title" width="800"
                                        aria-label="Enter your title" minLength={5} maxLength={100} required disabled={submitted}
                                        defaultValue={formData['title']} className="w-full bg-lynx placeholder:text-bluegreen py-4 px-4 border-2 rounded-full
                                                transition-all border-bluegreen mt-4" />
                                    <p className='text-purple font-semibold'>In remembrance of: (Name, birth and death
                                        date of someone close to you killed by gun violence) if applicable</p>
                                    <input type='text' placeholder="YOUR REMEMBRANCE" name="remembrance"
                                        id="remembrance" width="800" maxLength={100} aria-label="Enter your remembrance (optional)"
                                        minLength={5} disabled={submitted} defaultValue={formData['remembrance']}
                                        className="w-full bg-lynx placeholder:text-bluegreen py-4 px-4 border-2 rounded-full
                                                transition-all border-bluegreen mt-4" />
                                    <p className='text-purple font-semibold'>Why are you involved in TNGV? (800
                                        characters max)*</p>
                                    <textarea placeholder="WHY ARE YOU INVOLVED*" name="blurb" id="blurb"
                                        aria-label="Enter your bio" minLength={25} maxLength={800} rows={8} required
                                        disabled={submitted} defaultValue={formData['blurb']} className="w-full bg-lynx placeholder:text-bluegreen py-4 px-4 border-2 rounded-large
                                                        transition-all border-bluegreen mt-4" />
                                    <img src={`https://res.cloudinary.com/engagement-lab-home/image/upload/c_scale,f_auto,w_250/${formData['image']._meta.public_id}`} className="max-w-xs mt-4" />
                                            <input type="submit" value="Submit your profile" name="submit" aria-hidden="true" className='hidden' />
                                                    <div {...getRootProps({ className: 'dropzone bg-sorbet/30 p-4 mt-4 rounded-large cursor-pointer' })}>
                                                        <input {...getInputProps()} />
                                                        <p><b>To change your bio image</b>: Drag and drop a bio image here, or click to select one.*  <em>(Only *.jpeg and *.png images accepted)</em></p>
                                                            
                                                        {acceptedFileItems.length > 0 && (
                                                            <aside>
                                                                <h4>Attached file:</h4>
                                                                <ul>{acceptedFileItems}</ul>
                                                            </aside>
                                                        )}
                                                    </div>
                                                {!submitted ?
                                                    <button type='submit' className={`inline-block rounded-full px-10 py-2 mt-4 uppercase border-2
                                                border-oasis text-purple text-sm lg:text-lg transition-all max-w-[200px] hover:bg-oasis`} aria-label="Submit your profile">Update 
                                                    </button>
            : 
                                                // Loading
                                                <svg width="60" height="24" viewBox="0 0 60 24" xmlns="http://www.w3.org/2000/svg"
                                                    fill="#026670">
                                                    <circle cx="6" cy="12" r="3">
                                                        <animate attributeName="r" from="3" to="3" begin="0s" dur="1s"
                                                            values="3;6;3" calcMode="linear" repeatCount="indefinite" />
                                                        <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="1s"
                                                            values="1;.5;1" calcMode="linear" repeatCount="indefinite" />
                                                    </circle>
                                                    <circle cx="24" cy="12" r="3">
                                                        <animate attributeName="r" from="3" to="3" begin="0s" dur="1s"
                                                            values="6;3;6" calcMode="linear" repeatCount="indefinite" />
                                                        <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="1s"
                                                            values="1;.5;1" calcMode="linear" repeatCount="indefinite" />
                                                    </circle>
                                                    <circle cx="42" cy="12" r="3">
                                                        <animate attributeName="r" from="3" to="3" begin="0s" dur="1s"
                                                            values="3;6;3" calcMode="linear" repeatCount="indefinite" />
                                                        <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="1s"
                                                            values="1;.5;1" calcMode="linear" repeatCount="indefinite" />
                                                    </circle>
                                                </svg>
                                }
                                    </div> 
                            </div>
                    </form>
                        }
                                    
                        {editStatus === 'success' &&
                            <div className='text-purple'>
                                <p>Thanks for updating your profile!</p>
                            </div>
                        }
                        {editStatus === 'error' &&
                            <span className='text-green-blue'>
                                Sorry, there was a problem. Try again later, please.
                            </span>
                        }
                    
                    <hr />
                    
                    <form onSubmit={e => SubmitProfile(e, 'new')}>
                        <div>
                            {((status === '' || status !== 'success') && editStatus !== 'form') &&
                            <div>
                                <h3 className="text-1xl text-bluegreen">Don't have a profile?</h3>
                                <h2 className="text-2xl text-bluegreen font-semibold mb-8">Submit one!</h2>
                                <div className='flex flex-col'>
                                    <p>*Required</p>
                                    <p className='text-purple font-semibold'>First and last name you'd like displayed, including
                                        preferred prefix or suffixes*</p>
                                    <input type='text' placeholder="YOUR NAME*" name="name" id="name" width="800"
                                        aria-label="Enter your full name" minLength={5} required disabled={submitted}
                                        className="w-full bg-lynx placeholder:text-bluegreen py-4 px-4 border-2 rounded-full
                                    transition-all border-bluegreen" />
                                    <p className='text-purple font-semibold'>Title and Organization/affiliation you'd like listed (if applicable)*</p>
                                    <input type='text' placeholder="YOUR TITLE*" name="title" id="title" width="800"
                                        aria-label="Enter your title" minLength={5} maxLength={100} required disabled={submitted}
                                        className="w-full bg-lynx placeholder:text-bluegreen py-4 px-4 border-2 rounded-full
                                    transition-all border-bluegreen mt-4" />
                                     <p className='text-purple font-semibold'>In remembrance of: (Name, birth and death date of someone close to you killed by gun violence) if applicable</p>
                                    <input type='text' placeholder="YOUR REMEMBRANCE" name="remembrance"
                                        id="remembrance" width="800" maxLength={100} aria-label="Enter your remembrance (optional)"
                                        minLength={5} disabled={submitted} className="w-full bg-lynx placeholder:text-bluegreen py-4 px-4 border-2 rounded-full
                                                    transition-all border-bluegreen mt-4" />
                                    <p className='text-purple font-semibold'>Why are you involved in TNGV? (800 characters max)*</p>
                                    <textarea placeholder="WHY ARE YOU INVOLVED*" name="blurb" id="blurb"
                                        aria-label="Enter your bio" minLength={25} maxLength={800} rows={5} required
                                        disabled={submitted} className="w-full bg-lynx placeholder:text-bluegreen py-4 px-4 border-2 rounded-large
                                    transition-all border-bluegreen mt-4" />
                                    <input type="submit" value="Submit your profile" name="submit" aria-hidden="true" className='hidden' />
                                            <div {...getRootProps({ className: 'dropzone bg-sorbet/30 p-4 mt-4 rounded-large cursor-pointer' })}>
                                                <input {...getInputProps()} />
                                                <p><strong>Drag and drop a bio image here, or click to select one.*</strong> Please try to use a high-quality image. <em>(Only *.jpeg and *.png images accepted)</em></p>
                                                
                                                {acceptedFileItems.length > 0 && (
                                                    <aside>
                                                        <h4>Attached file:</h4>
                                                        <ul>{acceptedFileItems}</ul>
                                                    </aside>
                                                )} 
                                            </div>
                                        {!submitted ?
                                            <button type='submit' className={`inline-block rounded-full px-10 py-2 mt-4 uppercase border-2
                                        border-oasis text-purple text-sm lg:text-lg transition-all max-w-[200px] hover:bg-oasis`} aria-label="Submit your profile">Submit 
                                            </button>
    : 
                                        // Loading
                                        <svg width="60" height="24" viewBox="0 0 60 24" xmlns="http://www.w3.org/2000/svg"
                                            fill="#026670">
                                            <circle cx="6" cy="12" r="3">
                                                <animate attributeName="r" from="3" to="3" begin="0s" dur="1s"
                                                    values="3;6;3" calcMode="linear" repeatCount="indefinite" />
                                                <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="1s"
                                                    values="1;.5;1" calcMode="linear" repeatCount="indefinite" />
                                            </circle>
                                            <circle cx="24" cy="12" r="3">
                                                <animate attributeName="r" from="3" to="3" begin="0s" dur="1s"
                                                    values="6;3;6" calcMode="linear" repeatCount="indefinite" />
                                                <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="1s"
                                                    values="1;.5;1" calcMode="linear" repeatCount="indefinite" />
                                            </circle>
                                            <circle cx="42" cy="12" r="3">
                                                <animate attributeName="r" from="3" to="3" begin="0s" dur="1s"
                                                    values="3;6;3" calcMode="linear" repeatCount="indefinite" />
                                                <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="1s"
                                                    values="1;.5;1" calcMode="linear" repeatCount="indefinite" />
                                            </circle>
                                        </svg>
                                        }
                            </div>       
                        
                        </div>
                    }
                            
                            {
                            (editStatus !== 'form' && editStatus !== 'success') &&
                                <div>
                                    {status === 'success' &&
                                        <div className='text-purple'>
                                            <p>Thanks for submitting your profile!</p>
                                            <h3 className="text-3xl italic">Important!</h3>
                                            <p>
                                                <p>You will need the following token to login to edit your profile in the future. Please treat this token as you would a password.</p>
                                                <p>Your token is:</p>
                                                <p className="text-green-blue text-5xl font-extrabold">{userToken}</p>
                                            </p>
                                        </div>
                                    }
                                    {status === 'image' &&
                                        <span className='text-green-blue'>
                                            You need to attach a bio image.
                                        </span>
                                    }
                                    {status === 'error' &&
                                        <span className='text-green-blue'>
                                            Sorry, there was a problem. Try again later, please.
                                        </span>
                                    }
                                </div>
                            }
                            </div>
                    </form>
                    </div>
                </div>
        </div>
    </Layout>


  );
}
