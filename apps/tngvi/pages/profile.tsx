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
    const editFormRef = useRef<HTMLFormElement>(null);
    const status = useStore(state => state.status);
    const editStatus = useStore(state => state.editStatus);
    const submitted = useStore(state => state.submitted);
    const userToken = useStore(state => state.userToken);
    const formData = useStore(state => state.formData);

    const setStatus = useStore(state => state.setStatus);
    const setEditStatus = useStore(state => state.setEditStatus);
    const setEditProfile = useStore(state => state.setEditProfile);
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
        let form = e.target as HTMLFormElement;

        e.preventDefault();

        try {
            const reader = new FileReader()
            reader.onabort = () => {
                setStatus('error');
            };
            reader.onerror = () => {
                setStatus('error');
            };
            reader.onload = async () => {
                try {

                    const params = new URLSearchParams();
                    params.append('name', (form.querySelector('#name') as HTMLInputElement).value);
                    // TODO: email
                    // params.append('email', (form.querySelector('#email') as HTMLInputElement).value);
                    params.append('title', (form.querySelector('#title') as HTMLInputElement).value);
                    params.append('blurb', (form.querySelector('#blurb') as HTMLInputElement).value);
                    params.append('remembrance', (form.querySelector('#remembrance') as HTMLInputElement).value);
                    params.append('img', reader.result as string);

                    const requestResult = await axios.post('http://localhost:7071/api/orchestrators/UserCreateOrchestrator', params);

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
                                return;
                            }
                            else if(requestUpdate.data.runtimeStatus === 'Failed') {
                                setStatus('error');
                                return;
                            }
                        }, 3000)}

                        // Get durable function status after a bit of time
                        getUpdate();
                    }

                } catch (err) {
                    setSubmitted(false);
                    setStatus('error');
                }
            }
            if(acceptedFiles.length === 0) {
                setStatus('image');
                return;
            }
            setSubmitted(true);
            reader.readAsDataURL(acceptedFiles[0])
        } catch (err) {
            console.error(err);
            setStatus('error');
            setSubmitted(false);
        }
    }
    const SubmitUserToken = async (e: React.FormEvent < HTMLFormElement > ) => {
        let form = e.target as HTMLFormElement;

        e.preventDefault();
        setEditStatus('code');

        try {            
            const requestResult = await axios.get(`http://localhost:7071/api/PersonProfileGet?token=${(form.querySelector('#token') as HTMLInputElement).value}`);

            // No user 
            if(requestResult.status === 204) {
                setEditStatus('no_user');
            }
            // Request was successful
            else if (requestResult.status === 200) {
                setEditStatus('form');
                // const form = editFormRef.current;
                setFormData(requestResult.data)
                // Pre-fill form fields
                // for(let key in requestResult.data) {
                //     console.log(form?.querySelector(`#${key}`))
                //     (form?.querySelector(`#${key}`) as HTMLInputElement).value = requestResult.data[key];
                // }
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
                                    <button className={`inline-block rounded-full px-10 py-2 mt-4 uppercase border-2
                                        border-oasis text-purple text-sm lg:text-lg max-w-[200px] transition-all
                                        hover:bg-oasis`}>
                                        Next
                                    </button>
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
                            {editStatus === 'error' &&
                            <span className='text-green-blue'>
                                Sorry, there was a problem. Try again later, please.
                            </span>
                            }
                        </form>
                    }
                        <form id="edit" ref={editFormRef} onSubmit={e => SubmitProfile(e, 'edit')}>
                    {editStatus === 'form' &&

                    <div>

                            <h3 className="text-2xl text-bluegreen font-semibold mb-8">Edit your profile</h3>
                            <div>
                                <div>
                                    <div className='flex flex-col'>
                                        <p>*Required</p>
                                        <input type='text' placeholder="YOUR NAME*" name="name" id="name" width="800"
                                            aria-label="Enter your full name" minLength={5} required disabled={submitted} value={formData['name']}
                                            className="w-full bg-lynx placeholder:text-bluegreen py-4 px-4 border-2 rounded-full
                                        transition-all border-bluegreen" />
                                        <input type='text' placeholder="YOUR TITLE*" name="title" id="title" width="800"
                                            aria-label="Enter your title" minLength={5} required disabled={submitted} value={formData['title']}
                                            className="w-full bg-lynx placeholder:text-bluegreen py-4 px-4 border-2 rounded-full
                                        transition-all border-bluegreen mt-4" />
                                        <input type='text' placeholder="YOUR REMEMBRANCE" name="remembrance"
                                            id="remembrance" width="800" aria-label="Enter your remembrance (optional)"
                                            minLength={5} disabled={submitted} value={formData['remembrance']} 
                                            className="w-full bg-lynx placeholder:text-bluegreen py-4 px-4 border-2 rounded-full
                                                        transition-all border-bluegreen mt-4" />
                                        <textarea placeholder="YOUR BIO*" name="blurb" id="blurb"
                                            aria-label="Enter your bio" minLength={25} maxLength={800} rows={5} required
                                            disabled={submitted} value={formData['blurb']} 
                                            className="w-full bg-lynx placeholder:text-bluegreen py-4 px-4 border-2 rounded-large
                                                       transition-all border-bluegreen mt-4" />
                                        <input type="submit" value="Submit your profile" name="submit" aria-hidden="true" className='hidden' />
                                                {/* <div {...getRootProps({ className: 'dropzone bg-sorbet/30 p-4 mt-4 rounded-large cursor-pointer' })}>
                                                    <input {...getInputProps()} />
                                                    <p>Drag and drop a bio image here, or click to select one.*  <em>(Only *.jpeg and *.png images accepted)</em></p>
                                                    
                                                </div>
                                                {acceptedFileItems.length > 0 && (
                                                    <aside>
                                                        <h4>Attached file:</h4>
                                                        <ul>{acceptedFileItems}</ul>
                                                    </aside>
                                                )} */}
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
                                
                                    {status === 'success' &&
                                        <div className='text-purple'>
                                            <p>Thanks for updating your profile!</p>
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
                                </div>
                    }
                    </form>
                    <hr />
                    <form onSubmit={e => SubmitProfile(e, 'new')}>
                        <div>
                            {((status === '' || status !== 'success') && editStatus !== 'form') &&
                            <div>
                                <h3 className="text-1xl text-bluegreen">Don't have a profile?</h3>
                                <h2 className="text-2xl text-bluegreen font-semibold mb-8">Submit one!</h2>
                                <div className='flex flex-col'>
                                    <p>*Required</p>
                                    <input type='text' placeholder="YOUR NAME*" name="name" id="name" width="800"
                                        aria-label="Enter your full name" minLength={5} required disabled={submitted}
                                        className="w-full bg-lynx placeholder:text-bluegreen py-4 px-4 border-2 rounded-full
                                    transition-all border-bluegreen" />
                                    <input type='text' placeholder="YOUR TITLE*" name="title" id="title" width="800"
                                        aria-label="Enter your title" minLength={5} required disabled={submitted}
                                        className="w-full bg-lynx placeholder:text-bluegreen py-4 px-4 border-2 rounded-full
                                    transition-all border-bluegreen mt-4" />
                                    <input type='text' placeholder="YOUR REMEMBRANCE" name="remembrance"
                                        id="remembrance" width="800" aria-label="Enter your remembrance (optional)"
                                        minLength={5} disabled={submitted} className="w-full bg-lynx placeholder:text-bluegreen py-4 px-4 border-2 rounded-full
                                                    transition-all border-bluegreen mt-4" />
                                    <textarea placeholder="YOUR BIO*" name="blurb" id="blurb"
                                        aria-label="Enter your bio" minLength={25} maxLength={800} rows={5} required
                                        disabled={submitted} className="w-full bg-lynx placeholder:text-bluegreen py-4 px-4 border-2 rounded-large
                                    transition-all border-bluegreen mt-4" />
                                    <input type="submit" value="Submit your profile" name="submit" aria-hidden="true" className='hidden' />
                                            <div {...getRootProps({ className: 'dropzone bg-sorbet/30 p-4 mt-4 rounded-large cursor-pointer' })}>
                                                <input {...getInputProps()} />
                                                <p>Drag and drop a bio image here, or click to select one.*  <em>(Only *.jpeg and *.png images accepted)</em></p>
                                                
                                            </div>
                                            {acceptedFileItems.length > 0 && (
                                                <aside>
                                                    <h4>Attached file:</h4>
                                                    <ul>{acceptedFileItems}</ul>
                                                </aside>
                                            )}
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
                    </form>
                    </div>
                </div>
        </div>
    </Layout>


  );
}
