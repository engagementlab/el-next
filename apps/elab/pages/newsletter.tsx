import { useEffect } from 'react';
import Layout from '../components/Layout';
import { create } from 'zustand';
import router from 'next/router';
import _ from 'lodash';

type FormState = {
  status: string;
  prefilledEmail: string;
  submitted: boolean;
  gotTags: boolean;
  tags?: number[];
  setStatus: (status: string) => void;
  setEmail: (email: string) => void;
  setSubmitted: (isSet: boolean) => void;
  setGotTags: (isSet: boolean) => void;
  setTags: (tags: number[]) => void;
};

// Create store with Zustand
const useStore = create<FormState>((set) => ({
  status: '',
  prefilledEmail: '',
  submitted: false,
  gotTags: false,
  tags: [],
  setStatus: (status: string) =>
    set({
      status,
    }),
  setEmail: (email: string) =>
    set({
      prefilledEmail: email,
    }),
  setSubmitted: (isSet: boolean) =>
    set({
      submitted: isSet,
    }),
  setGotTags: (isSet: boolean) =>
    set({
      gotTags: isSet,
    }),
  setTags: (tags: number[]) =>
    set({
      tags,
    }),
}));

export default function Newsletter() {
  const {
    status,
    submitted,
    gotTags,
    prefilledEmail,
    tags,
    setStatus,
    setSubmitted,
    setGotTags,
    setEmail,
    setTags,
  } = useStore();

  const SubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    const email =
      prefilledEmail.length > 0
        ? prefilledEmail
        : (e.currentTarget[3] as HTMLInputElement).value;
    e.preventDefault();

    if (prefilledEmail.length === 0) {
      router.push(`/newsletter?email=${email}`, undefined, { shallow: true });
      return;
    }

    setSubmitted(true);

    const monthly = (e.currentTarget[0] as HTMLInputElement).checked;
    const tngv = (e.currentTarget[1] as HTMLInputElement).checked;
    const tnej = (e.currentTarget[2] as HTMLInputElement).checked;

    if (!monthly && !tngv && !tnej) {
      setStatus('noselection');
      setSubmitted(false);

      return;
    }

    const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email
    );

    if (emailValid) {
      try {
        await fetch(
          `${
            process.env.NEXT_PUBLIC_AZURE_FUNCTION_URI ||
            'https://elab-initiatives-api.azurewebsites.net/api'
          }/newsletter?email=${email}&monthly=${monthly}&tngv=${tngv}&tnej=${tnej}`
        )
          .then((response) => {
            return response;
          })
          .then((res) => {
            if (res.status === 409) {
              setStatus('already_subscribed');
              return;
            } else if (res.status === 200) {
              setStatus('modified_tags');
              return;
            }
            if (res.status === 500 || res.status === 404) {
              setStatus('error');
              return;
            }
            setStatus('success');
          })
          .catch(() => {
            setStatus('error');
          });
      } catch {
        setStatus('error');
      }
    } else setSubmitted(false);
  };
  interface CheckboxProps {
    id: string;
    // label: string;
  }

  useEffect(() => {
    if (gotTags || !router.isReady) return;

    const email = router.query['email'] as string;
    if (!email || email.length < 5) return;
    setEmail(email);
    // setSubmitted(true);
    setGotTags(true);

    debugger;
    fetch(
      `${
        process.env.NEXT_PUBLIC_AZURE_FUNCTION_URI ||
        'https://elab-initiatives-api.azurewebsites.net/api'
      }/newsletter?email=${email}&get_tags=true`
    )
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        // setStatus('success');
        setSubmitted(false);
        if (res) setTags(_.map(res['tags'], 'id'));
      })
      .catch(() => {
        // setStatus('error');
        setSubmitted(false);
      });
  });

  const Checkbox = (props: CheckboxProps) => (
    <div className="flex gap-2">
      <input
        className="peer relative appearance-none shrink-0 w-8 h-8 border-2 mt-1 
        focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-100
        border-slate bg-[rgba(255,255,255,0)] text-transparent accent-[#fcd2a3] text-slate bg-[rgba(255,255,255,0] before:content-none before:w-5 before:h-4"
        type="checkbox"
        id={props.id}
        defaultChecked={(tags && tags.includes(parseInt(props.id))) || false}
      />
      <svg
        className="absolute w-8 h-8 pointer-events-none hidden peer-checked:block stroke-black mt-1 outline-none"
        viewBox="0 0 30 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></svg>
      <svg
        viewBox="0 4 12 9"
        width="20"
        height="25"
        className="absolute pointer-events-none hidden peer-checked:block stroke-black stroke-2 mt-[0.45rem] ml-[.4rem] outline-none"
      >
        <path d="M 12 4.342 L 3.837 13 L 0 8.473 L 0.381 8.149 L 3.856 12.25 L 11.636 4 L 12 4.342 L 12 4.342 Z"></path>
      </svg>
    </div>
  );
  return (
    <Layout>
      <div className="container mt-14 mb-24 xl:mt-16 px-4 xl:px-8">
        <h3 className="uppercase font-extrabold text-4xl">
          Newsletter Preferences
        </h3>
        <div id="newsletter" className="text-xl">
          <form onSubmit={SubmitEmail}>
            <div className="py-6 w-full">
              {status === 'already_subscribed' && (
                <span className="text-green-blue">
                  You are already subscribed. Nice! 😎
                </span>
              )}{' '}
              {status === 'modified_tags' && (
                <span className="text-purple">
                  Your preferences have been updated. ✏️
                </span>
              )}
              {status === 'success' && (
                <span className="text-purple">Thanks for joining! 😍</span>
              )}
              {status === 'error' && (
                <span className="text-red">
                  Sorry, there was a problem. Try again later, please. ☹️
                </span>
              )}
              {(!status || status === 'noselection') && (
                <>
                  {!submitted ? (
                    // Form
                    <div className="flex flex-col w-full gap-y-2">
                      <div
                        className={
                          prefilledEmail.length > 0 ? 'block' : 'hidden'
                        }
                      >
                        <label className="flex flex-row w-fullg items-center">
                          <Checkbox id="3379057" />
                          <span className="ml-2 lg:flex lg:gap-x-5">
                            <span className="block font-medium">Monthly</span>
                            <span className="font-light">
                              Engagement Lab Newsletter
                            </span>
                          </span>
                        </label>
                        <label className="flex flex-row w-full items-center">
                          <Checkbox id="3379061" />
                          <span className="ml-2 lg:flex lg:gap-x-2">
                            <span className="block font-medium">Quarterly</span>
                            <span className="font-light">
                              Transforming Narratives of Gun Violence Newsletter
                            </span>
                          </span>
                        </label>
                        <label className="flex flex-row w-full items-center">
                          <Checkbox id="3379065" />
                          <span className="ml-2 lg:flex lg:gap-x-2">
                            <span className="block font-medium">Quarterly</span>
                            <span className="font-light">
                              Transforming Narratives for Environmental Justice
                              Newsletter
                            </span>
                          </span>
                        </label>
                      </div>

                      <div className="relative w-full my-6 max-w-xs">
                        <div className="absolute w-full h-12 border-yellow border-2 mt-1 ml-1"></div>
                        <input
                          type="email"
                          placeholder={
                            prefilledEmail.length > 0
                              ? prefilledEmail
                              : 'Your email'
                          }
                          name="EMAIL"
                          id="email"
                          width="800"
                          aria-label="Enter your email"
                          minLength={5}
                          required
                          disabled={submitted || prefilledEmail.length > 0}
                          className={`absolute transition-all w-full h-12 bg-[rgba(255,255,255,0)] border-2 focus:border-4 focus:border-yellow border-slate p-3 placeholder:text-slate focus:bg-yellow/25 shadow-[16px_20px_0px_0px_#2d3748]1 ${
                            prefilledEmail.length > 0 && 'opacity-50'
                          }`}
                        />
                      </div>

                      <button
                        type="submit"
                        aria-label="Subscribe"
                        className="group relative my-12"
                      >
                        <div className="absolute w-60 h-12 border-yellow border-2 mt-1 ml-1 bg-yellow bg-opacity-0 group-hover:bg-opacity-25"></div>
                        <div className="absolute w-60 h-12 bg-[rgba(255,255,255,0)] border-2 border-yellow py-2">
                          {prefilledEmail.length > 0
                            ? 'Update preferences'
                            : 'Get preferences'}
                          <svg
                            className="h-4 w-4 ml-2 inline-block group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                              stroke="black"
                            />
                          </svg>
                        </div>
                      </button>

                      {status === 'noselection' && (
                        <span className="text-red">
                          Please select at least one newsletter to join. 😕
                        </span>
                      )}
                    </div>
                  ) : (
                    // Loading
                    <svg
                      width="60"
                      height="24"
                      viewBox="0 0 60 24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#000"
                    >
                      <circle cx="6" cy="12" r="3">
                        <animate
                          attributeName="r"
                          from="3"
                          to="3"
                          begin="0s"
                          dur="1s"
                          values="3;6;3"
                          calcMode="linear"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="fill-opacity"
                          from="1"
                          to="1"
                          begin="0s"
                          dur="1s"
                          values="1;.5;1"
                          calcMode="linear"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle cx="24" cy="12" r="3">
                        <animate
                          attributeName="r"
                          from="3"
                          to="3"
                          begin="0s"
                          dur="1s"
                          values="6;3;6"
                          calcMode="linear"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="fill-opacity"
                          from="1"
                          to="1"
                          begin="0s"
                          dur="1s"
                          values="1;.5;1"
                          calcMode="linear"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle cx="42" cy="12" r="3">
                        <animate
                          attributeName="r"
                          from="3"
                          to="3"
                          begin="0s"
                          dur="1s"
                          values="3;6;3"
                          calcMode="linear"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="fill-opacity"
                          from="1"
                          to="1"
                          begin="0s"
                          dur="1s"
                          values="1;.5;1"
                          calcMode="linear"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </svg>
                  )}
                </>
              )}
            </div>
          </form>
          <div className="subscribed"></div>
        </div>
      </div>
    </Layout>
  );
}
