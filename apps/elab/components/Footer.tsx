import React, { Component } from 'react';
import Link from 'next/link';
import { create } from 'zustand';

import packageInfo from '../package.json';

type FormState = {
  status: string;
  submitted: boolean;
  setStatus: (status: string) => void;
  setSubmitted: (isSet: boolean) => void;
};
// Create store with Zustand
const useStore = create<FormState>((set) => ({
  status: '',
  submitted: false,
  setStatus: (status: string) =>
    set({
      status,
    }),
  setSubmitted: (isSet: boolean) =>
    set({
      submitted: isSet,
    }),
}));

export const Footer = () => {
  const { status, submitted, setStatus, setSubmitted } = useStore();
  // = useStore((state) => state.submitted);
  // = useStore((state) => state.setStatus);
  // = useStore((state) => state.setSubmitted);

  const SubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    const email = (e.currentTarget[0] as HTMLInputElement).value;
    const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email
    );

    if (emailValid) {
      await fetch(
        `https://elab-initiatives-api.azurewebsites.net/api/newsletter?email=${email}`
      )
        .then((response) => {
          return response;
        })
        .then((res) => {
          if (res.status === 409) {
            setStatus('already_subscribed');
            return;
          }
          if (res.status === 500) {
            setStatus('error');
            return;
          }
          setStatus('success');
        })
        .catch((error) => {
          setStatus('error');
        });
    } else setSubmitted(false);
  };
  return (
    <div>
      <nav className="w-full px-6 xl:px-12 my-7 mb-24">
        <Link href="/" passHref>
          <svg width="70" height="70" fill="none" viewBox="0 0 70 70">
            <path
              fill="#000"
              fill-rule="evenodd"
              d="M70 35c0 19.33-15.67 35-35 35S0 54.33 0 35 15.67 0 35 0s35 15.67 35 35z"
              clip-rule="evenodd"
            />
            <path
              fill="#F6A536"
              fill-rule="evenodd"
              d="M28.075 17.992l.018 28.195h20.244v5.82H21.69V18.053l6.385-.06z"
              clip-rule="evenodd"
            />
            <path
              fill="#00AB9E"
              fill-rule="evenodd"
              d="M28.075 32.18v5.869h20.262v-5.821l-20.262-.048z"
              clip-rule="evenodd"
            />
            <path
              fill="#F72923"
              fill-rule="evenodd"
              d="M28.075 17.992v5.868h20.262v-5.82l-20.262-.048z"
              clip-rule="evenodd"
            />
          </svg>
        </Link>
        <div className="mt-4 w-full flex flex-col lg:flex-row justify-between">
          {/* Newsletter signup */}
          <div id="newsletter">
            <form onSubmit={SubmitEmail}>
              <div
                className={`py-6 px-8 w-full border-2 transition-all ${
                  status ? 'border-red' : 'border-black'
                }`}
              >
                {status === 'already_subscribed' && (
                  <span className="text-bluegreen">
                    You are already subscribed. Nice! 😎
                  </span>
                )}
                {status === 'success' && (
                  <span className="text-purple">Thanks for joining! 😍</span>
                )}
                {status === 'error' && (
                  <span className="text-green-blue">
                    Sorry, there was a problem. Try again later, please. ☹️
                  </span>
                )}

                {!status && (
                  <div>
                    {!submitted ? (
                      // Form
                      <span className="flex w-full justify-between items-center">
                        <input
                          type="email"
                          placeholder="ADD YOUR EMAIL"
                          name="EMAIL"
                          id="email"
                          width="800"
                          aria-label="Enter your email"
                          minLength={5}
                          required
                          disabled={submitted}
                          className="w-full bg-lynx placeholder:text-bluegreen"
                        />
                        <input
                          type="submit"
                          value="Add your email"
                          name="subscribe"
                          id="mc-embedded-subscribe"
                          aria-hidden="true"
                          className="hidden"
                        />
                        <button
                          type="submit"
                          aria-label="Subscribe"
                          className="group"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#000"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </button>
                      </span>
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
                  </div>
                )}
              </div>
            </form>
            <div className="subscribed"></div>
          </div>
          <p>
            <span className="italic ">ELab Home</span> v{packageInfo.version}
            <a
              href="https://github.com/engagementlab"
              role="link"
              aria-label="Link to the Engagement Lab's Github repo for elab home app"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-6 w-6 fill-slate-900"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"
                ></path>
              </svg>
            </a>
          </p>
        </div>
      </nav>
    </div>
  );
};

export default Footer;
