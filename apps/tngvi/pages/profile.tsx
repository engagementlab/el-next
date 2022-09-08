import create from 'zustand';
import Layout from '../components/Layout';

import {
    useDropzone
} from 'react-dropzone';

type FormState = {
    status: string
    newProfile: boolean
    submitted: boolean
    setStatus: (status: string) => void
    setNewProfile: (isSet: boolean) => void
    setSubmitted: (isSet: boolean) => void
}
// Create store with Zustand
const useStore = create < FormState > (set => ({
    status: '',
    newProfile: false,
    submitted: false,
    setStatus: (status: string) => set({
        status
    }),
    setNewProfile: (isSet: boolean) => set({
        newProfile: isSet
    }),
    setSubmitted: (isSet: boolean) => set({
        submitted: isSet
    })
}));
export default function GetInvolved() {
    const status = useStore(state => state.status);
    const submitted = useStore(state => state.submitted);
    const setStatus = useStore(state => state.setStatus);
    const setNewProfile = useStore(state => state.setNewProfile);
    const setSubmitted = useStore(state => state.setSubmitted);

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
    const SubmitNewProfile = async (e: React.FormEvent < HTMLFormElement > ) => {
        let formData = new FormData(e.target as HTMLFormElement);

        e.preventDefault();
        setSubmitted(true);

        // const email =  (e.currentTarget[0] as HTMLInputElement).value;
        // const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

        // if(emailValid) {
        //  return

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
                    formData.append('img', reader.result as string);
                    // debugger
                    await fetch('http://localhost:7071/api/orchestrators/UserCreateOrchestrator', {
                        method: 'POST',
                        headers: {
                            //   'Accept': 'application/json',
                            //   'Content-Type': 'application/octet-stream'
                        },
                        body: formData
                    }).then((response) => {
                        return response;
                    }).then((res) => {
                        if (res.status === 409) {
                            setStatus('already_subscribed');
                            return;
                        }
                        if (res.status === 500) {
                            setStatus('error');
                            return;
                        }
                        setStatus('success');
                    }).catch((error) => {
                        setStatus('error');
                    });

                    // var xhr = new XMLHttpRequest();
                    // xhr.open('POST', '/media/upload', true);
                    // xhr.onprogress = (e) => {
                    // if(e.loaded !== e.total) return;
                    // setUploadOpen(false);
                    // axios.get('/media/get/upload').then((response) => {
                    //     setData(response.data);
                    //     toggleWaiting();
                    // });
                    // };
                    // xhr.onabort = () => {
                    //     setStatus('error');
                    // };
                    // xhr.onerror = () => {
                    //     setErrorOpen(true);
                    // };
                    // xhr.send(formData);
                } catch (err) {
                    setStatus('error');
                }
            }
            reader.readAsDataURL(acceptedFiles[0])
        } catch (err) {
            setStatus('error');
        }
        // }
        // else setSubmitted(false);

    }

  return (
    <Layout>

        <div className="container relative mt-14 mb-24 xl:mt-16 px-4 xl:px-8 w-full lg:w-7/12 z-10">
            <h2 className="text-2xl text-bluegreen font-semibold mb-8">Profile</h2>

            <div className="mb-14 w-full xl:flex">
                <div className="mt-14 xl:mt-16 w-full">
                    <div>

                                <button onClick={() => {setNewProfile(true)}} className={`inline-block rounded-full px-10 py-7 uppercase border-2
                                    border-oasis text-purple text-sm lg:text-lg transition-all`}>
                                    Create Profile
                                </button>

                        <form onSubmit={SubmitNewProfile}>
                            <div >
                                {/* {!status && */}
                                <div>
                                    {/* {!submitted ? */}
                                    // Form
                                    <span className='flex flex-col'>
                                        <input type='text' placeholder="YOUR NAME" name="name" id="name" width="800"
                                            aria-label="Enter your full name" minLength={5} required
                                            disabled={submitted} className={`w-full bg-lynx placeholder:text-bluegreen
                                            py-4 px-4 border-2 rounded-full transition-all ${status ? 'border-[#F4B477]'
                                            : 'border-bluegreen' }`} />
                                        <input type='text' placeholder="YOUR TITLE" name="title" id="title" width="800"
                                            aria-label="Enter your title" minLength={5} required disabled={submitted}
                                            className='w-full bg-lynx placeholder:text-bluegreen' />
                                        <textarea placeholder="YOUR BIO" name="blurb" id="blurb"
                                            aria-label="Enter your bio" minLength={25} maxLength={800} rows={5}
                                            required disabled={submitted}
                                            className='w-full bg-lynx placeholder:text-bluegreen' />
                                        <input type='text' placeholder="YOUR REMEMBRANCE" name="remembrance" id="remembrance" width="800"
                                                aria-label="Enter your remembrance (optional)" minLength={5} disabled={submitted}
                                                className='w-full bg-lynx placeholder:text-bluegreen' />
                                        <input type="submit" value="Submit your profile" name="submit" aria-hidden="true" className='hidden' />
                                        <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p>Drag and drop an image here, or click to select one.</p>
                        <em>(Only *.jpeg and *.png images will be accepted)</em>
                    </div>
                                        {acceptedFileItems.length > 0 && (
                                            <aside>
                                                <h4>Accepted files</h4>
                                                <ul>{acceptedFileItems}</ul>
                                            </aside>
                                        )}
                                        <button type='submit' aria-label="Submit your profile">Submit 
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                                viewBox="0 0 24 24" stroke="#026670" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </button>
                                    </span>
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
                                    {/* } */}
                                </div>
                                {/* } */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Layout>


  );
}
