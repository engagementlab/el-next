import React, { Component } from 'react';
import Link from 'next/link';
import { create } from 'zustand';

import packageInfo from '../package.json';
import Divider from './Divider';
import { CustomEase } from '@/types';

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

  const SubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    const monthly = (e.currentTarget[0] as HTMLInputElement).checked;
    const tngv = (e.currentTarget[1] as HTMLInputElement).checked;
    const tnej = (e.currentTarget[2] as HTMLInputElement).checked;
    if (!monthly && !tngv && !tnej) {
      setStatus('noselection');
      setSubmitted(false);

      return;
    }

    const email = (e.currentTarget[3] as HTMLInputElement).value;
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
            } else if (res.status === 204) {
              setStatus('tags_modified');
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
  const GetInTouch = () => {
    return (
      <div className="flex flex-col lg:flex-row items-center mt-12">
        <div className="text-center lg:text-left">
          <h3 className="uppercase font-extrabold text-xl">Get In Touch</h3>
          <p className="mt-3">
            engagementlab@emerson.edu
            <br />
            120 Boylston St, Boston MA 02116
          </p>
        </div>
        <div className="flex flex-row justify-around w-1/2 mt-3">
          <a
            href="https://www.instagram.com/engagelab"
            role="link"
            aria-label="Link to the Engagement Lab's Instagram profile"
            className={`transition-all hover:scale-110 hover:opacity-40 ${CustomEase}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <title>Instagram logo</title>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/engagement-lab-emerson-college"
            role="link"
            aria-label="Link to the Engagement Lab's LinkedIn profile"
            className={`transition-all hover:scale-110 hover:opacity-40 ${CustomEase}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <title>LinkedIn logo</title>
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </div>
    );
  };
  const LicensePrivacy = () => {
    return (
      <>
        <div className="flex flex-row mt-10">
          <svg width="35px" height="35px" viewBox="5.5 -3.5 64 64">
            <g>
              <circle
                fill="#ffffff"
                fillOpacity={0}
                cx="37.785"
                cy="28.501"
                r="8.836"
              />
              <path d="M37.441-3.5c8.951,0,16.572,3.125,22.857,9.372c3.008,3.009,5.295,6.448,6.857,10.314   c1.561,3.867,2.344,7.971,2.344,12.314c0,4.381-0.773,8.486-2.314,12.313c-1.543,3.828-3.82,7.21-6.828,10.143   c-3.123,3.085-6.666,5.448-10.629,7.086c-3.961,1.638-8.057,2.457-12.285,2.457s-8.276-0.808-12.143-2.429   c-3.866-1.618-7.333-3.961-10.4-7.027c-3.067-3.066-5.4-6.524-7-10.372S5.5,32.767,5.5,28.5c0-4.229,0.809-8.295,2.428-12.2   c1.619-3.905,3.972-7.4,7.057-10.486C21.08-0.394,28.565-3.5,37.441-3.5z M37.557,2.272c-7.314,0-13.467,2.553-18.458,7.657   c-2.515,2.553-4.448,5.419-5.8,8.6c-1.354,3.181-2.029,6.505-2.029,9.972c0,3.429,0.675,6.734,2.029,9.913   c1.353,3.183,3.285,6.021,5.8,8.516c2.514,2.496,5.351,4.399,8.515,5.715c3.161,1.314,6.476,1.971,9.943,1.971   c3.428,0,6.75-0.665,9.973-1.999c3.219-1.335,6.121-3.257,8.713-5.771c4.99-4.876,7.484-10.99,7.484-18.344   c0-3.543-0.648-6.895-1.943-10.057c-1.293-3.162-3.18-5.98-5.654-8.458C50.984,4.844,44.795,2.272,37.557,2.272z M37.156,23.187   l-4.287,2.229c-0.458-0.951-1.019-1.619-1.685-2c-0.667-0.38-1.286-0.571-1.858-0.571c-2.856,0-4.286,1.885-4.286,5.657   c0,1.714,0.362,3.084,1.085,4.113c0.724,1.029,1.791,1.544,3.201,1.544c1.867,0,3.181-0.915,3.944-2.743l3.942,2   c-0.838,1.563-2,2.791-3.486,3.686c-1.484,0.896-3.123,1.343-4.914,1.343c-2.857,0-5.163-0.875-6.915-2.629   c-1.752-1.752-2.628-4.19-2.628-7.313c0-3.048,0.886-5.466,2.657-7.257c1.771-1.79,4.009-2.686,6.715-2.686   C32.604,18.558,35.441,20.101,37.156,23.187z M55.613,23.187l-4.229,2.229c-0.457-0.951-1.02-1.619-1.686-2   c-0.668-0.38-1.307-0.571-1.914-0.571c-2.857,0-4.287,1.885-4.287,5.657c0,1.714,0.363,3.084,1.086,4.113   c0.723,1.029,1.789,1.544,3.201,1.544c1.865,0,3.18-0.915,3.941-2.743l4,2c-0.875,1.563-2.057,2.791-3.541,3.686   c-1.486,0.896-3.105,1.343-4.857,1.343c-2.896,0-5.209-0.875-6.941-2.629c-1.736-1.752-2.602-4.19-2.602-7.313   c0-3.048,0.885-5.466,2.658-7.257c1.77-1.79,4.008-2.686,6.713-2.686C51.117,18.558,53.938,20.101,55.613,23.187z" />
            </g>
          </svg>
          <svg
            x="0px"
            y="0px"
            width="35px"
            height="35px"
            viewBox="5.5 -3.5 64 64"
          >
            <g>
              <circle
                fill="#FFFFFF"
                fillOpacity={0}
                cx="37.637"
                cy="28.806"
                r="28.276"
              />
              <g>
                <path
                  d="M37.443-3.5c8.988,0,16.57,3.085,22.742,9.257C66.393,11.967,69.5,19.548,69.5,28.5c0,8.991-3.049,16.476-9.145,22.456
			C53.879,57.319,46.242,60.5,37.443,60.5c-8.649,0-16.153-3.144-22.514-9.43C8.644,44.784,5.5,37.262,5.5,28.5
			c0-8.761,3.144-16.342,9.429-22.742C21.101-0.415,28.604-3.5,37.443-3.5z M37.557,2.272c-7.276,0-13.428,2.553-18.457,7.657
			c-5.22,5.334-7.829,11.525-7.829,18.572c0,7.086,2.59,13.22,7.77,18.398c5.181,5.182,11.352,7.771,18.514,7.771
			c7.123,0,13.334-2.607,18.629-7.828c5.029-4.838,7.543-10.952,7.543-18.343c0-7.276-2.553-13.465-7.656-18.571
			C50.967,4.824,44.795,2.272,37.557,2.272z M46.129,20.557v13.085h-3.656v15.542h-9.944V33.643h-3.656V20.557
			c0-0.572,0.2-1.057,0.599-1.457c0.401-0.399,0.887-0.6,1.457-0.6h13.144c0.533,0,1.01,0.2,1.428,0.6
			C45.918,19.5,46.129,19.986,46.129,20.557z M33.042,12.329c0-3.008,1.485-4.514,4.458-4.514s4.457,1.504,4.457,4.514
			c0,2.971-1.486,4.457-4.457,4.457S33.042,15.3,33.042,12.329z"
                />
              </g>
            </g>
          </svg>
          <svg
            x="0px"
            y="0px"
            width="35px"
            height="35px"
            viewBox="5.5 -3.5 64 64"
          >
            <g>
              <circle
                fill="#FFFFFF"
                fillOpacity={0}
                cx="37.47"
                cy="28.736"
                r="29.471"
              />
              <g>
                <path
                  d="M37.442-3.5c8.99,0,16.571,3.085,22.743,9.256C66.393,11.928,69.5,19.509,69.5,28.5c0,8.992-3.048,16.476-9.145,22.458
			C53.88,57.32,46.241,60.5,37.442,60.5c-8.686,0-16.19-3.162-22.513-9.485C8.644,44.728,5.5,37.225,5.5,28.5
			c0-8.762,3.144-16.343,9.429-22.743C21.1-0.414,28.604-3.5,37.442-3.5z M12.7,19.872c-0.952,2.628-1.429,5.505-1.429,8.629
			c0,7.086,2.59,13.22,7.77,18.4c5.219,5.144,11.391,7.715,18.514,7.715c7.201,0,13.409-2.608,18.63-7.829
			c1.867-1.79,3.332-3.657,4.398-5.602l-12.056-5.371c-0.421,2.02-1.439,3.667-3.057,4.942c-1.622,1.276-3.535,2.011-5.744,2.2
			v4.915h-3.714v-4.915c-3.543-0.036-6.782-1.312-9.714-3.827l4.4-4.457c2.094,1.942,4.476,2.913,7.143,2.913
			c1.104,0,2.048-0.246,2.83-0.743c0.78-0.494,1.172-1.312,1.172-2.457c0-0.801-0.287-1.448-0.858-1.943l-3.085-1.315l-3.771-1.715
			l-5.086-2.229L12.7,19.872z M37.557,2.214c-7.276,0-13.428,2.571-18.457,7.714c-1.258,1.258-2.439,2.686-3.543,4.287L27.786,19.7
			c0.533-1.676,1.542-3.019,3.029-4.028c1.484-1.009,3.218-1.571,5.2-1.686V9.071h3.715v4.915c2.934,0.153,5.6,1.143,8,2.971
			l-4.172,4.286c-1.793-1.257-3.619-1.885-5.486-1.885c-0.991,0-1.876,0.191-2.656,0.571c-0.781,0.381-1.172,1.029-1.172,1.943
			c0,0.267,0.095,0.533,0.285,0.8l4.057,1.83l2.8,1.257l5.144,2.285l16.397,7.314c0.535-2.248,0.801-4.533,0.801-6.857
			c0-7.353-2.552-13.543-7.656-18.573C51.005,4.785,44.831,2.214,37.557,2.214z"
                />
              </g>
            </g>
          </svg>
          <svg viewBox="5.5 -3.5 35 35" width="35" height="35">
            <g transform="matrix(0.546875, 0, 0, 0.546875, 2.492188, -1.585937)">
              <circle
                fill="#FFFFFF"
                fillOpacity={0}
                cx="36.944"
                cy="28.631"
                r="29.105"
              ></circle>
              <g>
                <path
                  d="M37.443-3.5c8.951,0,16.531,3.105,22.742,9.315C66.393,11.987,69.5,19.548,69.5,28.5c0,8.954-3.049,16.457-9.145,22.514
			C53.918,57.338,46.279,60.5,37.443,60.5c-8.649,0-16.153-3.143-22.514-9.429C8.644,44.786,5.5,37.264,5.5,28.501
			c0-8.723,3.144-16.285,9.429-22.685C21.138-0.395,28.643-3.5,37.443-3.5z M37.557,2.272c-7.276,0-13.428,2.572-18.457,7.715
			c-5.22,5.296-7.829,11.467-7.829,18.513c0,7.125,2.59,13.257,7.77,18.4c5.181,5.182,11.352,7.771,18.514,7.771
			c7.123,0,13.334-2.609,18.629-7.828c5.029-4.876,7.543-10.99,7.543-18.343c0-7.313-2.553-13.485-7.656-18.513
			C51.004,4.842,44.832,2.272,37.557,2.272z M23.271,23.985c0.609-3.924,2.189-6.962,4.742-9.114
			c2.552-2.152,5.656-3.228,9.314-3.228c5.027,0,9.029,1.62,12,4.856c2.971,3.238,4.457,7.391,4.457,12.457
			c0,4.915-1.543,9-4.627,12.256c-3.088,3.256-7.086,4.886-12.002,4.886c-3.619,0-6.743-1.085-9.371-3.257
			c-2.629-2.172-4.209-5.257-4.743-9.257H31.1c0.19,3.886,2.533,5.829,7.029,5.829c2.246,0,4.057-0.972,5.428-2.914
			c1.373-1.942,2.059-4.534,2.059-7.771c0-3.391-0.629-5.971-1.885-7.743c-1.258-1.771-3.066-2.657-5.43-2.657
			c-4.268,0-6.667,1.885-7.2,5.656h2.343l-6.342,6.343l-6.343-6.343L23.271,23.985L23.271,23.985z"
                ></path>
              </g>
            </g>
          </svg>
        </div>
        <div className="flex flex-row gap-x-4 mt-5">
          <Link href="/privacy">Privacy Policy</Link>
          {/* <Link href="/attributions">Attributions</Link> */}
        </div>
      </>
    );
  };

  interface CheckboxProps {
    id: string;
    // label: string;
  }

  const Checkbox = (props: CheckboxProps) => (
    <div className="flex gap-2">
      <input
        className="peer relative appearance-none shrink-0 w-4 h-4 border-2 mt-1 
        focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-100
        border-slate bg-[rgba(255,255,255,0)] text-transparent accent-[#fcd2a3] text-slate bg-[rgba(255,255,255,0] before:content-none before:w-2 before:h-2"
        type="checkbox"
        id={props.id}
        defaultChecked={true}
      />
      <svg
        className="absolute w-3 h-3 pointer-events-none hidden peer-checked:block stroke-black mt-1 outline-none"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* <polyline points="20 6 9 17 4 12"></polyline> */}
      </svg>
      {/* <svg
        className="absolute w-3 h-3 pointer-events-none hidden peer-checked:block stroke-black mt-1 outline-none"
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
      >
        <path d="M24 4.685l-16.327 17.315-7.673-9.054.761-.648 6.95 8.203 15.561-16.501.728.685z" />
      </svg> */}
      <svg
        viewBox="0 4 12 9"
        width="11"
        height="9"
        className="absolute pointer-events-none hidden peer-checked:block stroke-black mt-[0.45rem] ml-[0.17rem] outline-none"
      >
        <path d="M 12 4.342 L 3.837 13 L 0 8.473 L 0.381 8.149 L 3.856 12.25 L 11.636 4 L 12 4.342 L 12 4.342 Z"></path>
      </svg>
    </div>
  );

  return (
    <div className=" bg-yellow bg-opacity-50">
      <Divider />
      <nav className="w-full flex flex-col bottom-0 lg:flex-row-reverse justify-between">
        <div className="flex flex-col items-center justify-center lg:w-2/3 mt-10 lg:mt-0 px-6 md:px-16 xl:px-24">
          <div className="flex flex-col items-center justify-around lg:flex-row w-full">
            <svg
              viewBox="0 0 166 58.741"
              width="166"
              height="58.741"
              aria-label="Engagement Lab logo"
            >
              <g
                id="logo-group"
                transform="matrix(0.390588, 0, 0, 0.390588, 0, 0)"
              >
                <g id="color-lab">
                  <path
                    d="M419,32.68v7.74H391.06V1.74h7.6V32.68Z"
                    style={{ fill: '#ff0000' }}
                  ></path>
                  <path
                    d="M400.33,80,405,66.59,409.72,80Zm15.13,16.33h7.83L408.94,55.46h-7.83L386.76,96.28h7.83l2.87-8.16h15.13l2.87,8.16Z"
                    style={{ fill: '#00ab9e' }}
                  ></path>
                  <path
                    d="M413.25,136.25c0-1.94-1.72-3.87-5.18-3.87H397v7.74h11.11C411.47,140.12,413.25,138.18,413.25,136.25Zm-1.44-15.47c0-1.94-1.72-3.87-5.12-3.87H397v7.74h10C410.2,124.54,411.81,122.66,411.81,120.78Zm9.33,15.47c0,5.8-4.38,11.6-13.07,11.6H388.91V109.18h17.78c8.69,0,13,5.8,13,11.65a11.52,11.52,0,0,1-2.36,7A11.2,11.2,0,0,1,421.14,136.25Z"
                    style={{ fill: ' #f6a536' }}
                  ></path>
                </g>
                {/* <path
                  id="bw-lab"
                  d="M420.33,41.92h-31.5V0h10.54V31.37h21V41.92Zm-28.86-2.69h26.12V34.06h-21V2.69h-5.16V39.22h0Zm16.07,111.16h-20V108.47H406.2c9.64,0,14,6.82,14,13.2a13.39,13.39,0,0,1-1.93,6.91,13.21,13.21,0,0,1-.23,17.77,14.29,14.29,0,0,1-10.5,4Zm-17.32-2.69h17.32c7.81,0,11.4-5.39,11.4-10.41a10.15,10.15,0,0,0-3.27-7.59l-.9-.8.72-1a10.51,10.51,0,0,0,2-6.29c0-7.18-5.89-10.5-11.31-10.5h-16V147.7Zm17.32-5.16H395.38V132h12.16c4.22,0,6.37,2.65,6.37,5.25S411.72,142.54,407.54,142.54Zm-9.47-2.69h9.47c2.56,0,3.68-1.35,3.68-2.56s-1.16-2.56-3.68-2.56h-9.47Zm8.44-13H395.38V116.33H406.2c4.17,0,6.32,2.65,6.32,5.25C412.52,124.9,409.52,126.74,406.51,126.88Zm-8.44-2.7h8.39c2.34-.09,3.37-1.35,3.37-2.56s-1.12-2.55-3.63-2.55h-8.13ZM425,96.36H414.18l-2.91-8H397.8l-2.91,8H384.07L399.6,54h9.83Zm-8.93-2.7h5.07L407.59,56.73h-6.06L388,93.66h5.08L396,85.72h17.19Zm-4.85-13.15H397.85l6.69-18.22Zm-9.51-2.69h5.65l-2.82-7.72-2.83,7.72Z"
                ></path> */}
                <path
                  pathLength={100}
                  d="M144.18,147.85a15.18,15.18,0,0,1-6.91-1.52,12.82,12.82,0,0,1-5.22-5.11c-1.78-3.18-2.54-7.56-2.54-14.66,0-16.18-1.26-26.62-3.74-31-1-1.78-1.78-2.47-6.28-2.55V147.6H107.43V81.24h11.06a27.75,27.75,0,0,1,9.36,1.22A15.89,15.89,0,0,1,136.46,90c3.64,6.51,5.19,17.46,5.19,36.61,0,5.79.64,8.17,1.17,9.15.07.12.12.22.14.24a2.61,2.61,0,0,0,1.22.15c.74,0,.74,0,1-.5.8-1.62,1.2-4.65,1.2-9,0-19.15,1.55-30.09,5.19-36.6a15.58,15.58,0,0,1,8.53-7.5,28.19,28.19,0,0,1,9.36-1.22h11.06V147.6H168.43V93c-4.21.07-5.18.68-6.29,2.56-2.45,4.34-3.65,14.48-3.65,31,0,6.5-.72,10.83-2.33,14a12.15,12.15,0,0,1-4.87,5.39,13.37,13.37,0,0,1-7.11,1.87ZM126.78,27.36C126.78,10.6,137.41,0,154.07,0s26.16,9.25,26.16,25.05v.77H167.81v-1c0-8.1-4.7-13.49-13.74-13.49-9.32,0-14.87,6.94-14.87,15.41V43.36c0,9.25,5.18,15.41,14.87,15.41,9.88,0,13.74-4.91,13.74-13v-.67h-16V33.91h28.42V45.09c0,16.09-9.13,25-26.16,25-16.18,0-27.29-9.44-27.29-27.36ZM225.2,42.09l-9.35-29.88h-1.13l-8,29.88Zm.1-40.35L245,68.35H232.1l-4-14.84H203.76l-4,14.84H186.93L205.27,1.74Zm26.52,25.62C251.82,10.6,262.79,0,280,0s27,9.25,27,25.05v.77H294.14v-1c0-8.1-4.85-13.49-14.17-13.49-9.61,0-15.34,6.94-15.34,15.41V43.36c0,9.25,5.34,15.41,15.34,15.41,10.19,0,14.17-4.91,14.17-13v-.67h-16.5V33.91H307V45.09c0,16.09-9.41,25-27,25-16.7,0-28.15-9.44-28.15-27.36V27.36Zm115-25.62V13.16H328.24V29.05h36V40.47h-36V56.93h39.18V68.35H315.85V1.74ZM51,1.74V13.16H12.39V29.05h36V40.47h-36V56.93H51.57V68.35H0V1.74Zm189.09,79.5V92.66H201.47v15.89h36V120h-36v16.46h39.18v11.42H189.08V81.24Zm129.24,2.43V95H349.05v55H336.42V95H316.13V83.67ZM0,122.07H83.8V109.18H0ZM305.11,83.39H293.32V138.7l-.25,0c-2.84-.41-4.67-2.13-5.94-5.58-1.47-4-1.92-9.55-2.39-15.41l-.08-1.05c-.59-7.64-1.21-15.54-4-21.79a19,19,0,0,0-6.7-8.29,19.59,19.59,0,0,0-10.31-3.16H251.39V150h11.79V94.67l.3,0a8,8,0,0,1,3.91,1.4,10.77,10.77,0,0,1,3,4.46c1.55,4.15,1.92,9.82,2.31,15.83l.05.83c.39,6.79.87,15.24,3.66,21.58A18.34,18.34,0,0,0,283,147a19.67,19.67,0,0,0,9.8,3.05h12.31V83.39ZM116,1.74H104.24V57.05L104,57c-2.84-.41-4.67-2.13-5.94-5.58-1.47-4-1.92-9.55-2.39-15.41L95.58,35c-.6-7.64-1.21-15.54-4-21.78a19,19,0,0,0-6.7-8.3A19.59,19.59,0,0,0,74.6,1.74H62.31V68.35H74.1V13l.3,0a8,8,0,0,1,3.91,1.4,10.86,10.86,0,0,1,3,4.46c1.54,4.15,1.91,9.82,2.31,15.83l0,.83c.39,6.79.87,15.24,3.66,21.58a18.39,18.39,0,0,0,6.54,8.14,19.74,19.74,0,0,0,9.81,3H116V1.74Z"
                ></path>
              </g>
            </svg>
            <svg
              width="169"
              height="70"
              fill="none"
              viewBox="0 0 169 70"
              className="mt-7 lg:mt-0"
            >
              <title>Emerson College logo</title>
              <path
                fill="#000"
                d="M57.405 38.537v-1.053c.15-.05.251-.15.351-.15 2.208-.252 2.208-.252 2.208-2.41 0-2.76.05-5.47 0-8.229-.05-3.814-2.107-5.118-5.62-3.613-.752.301-1.455.753-2.258 1.204V35.227c0 1.956.1 2.057 2.058 2.157.2 0 .35.05.652.1.05.352.05.703.1 1.155h-8.932c-.05-.352-.05-.703-.1-1.054.25-.1.351-.15.502-.15 2.107-.151 2.107-.151 2.107-2.259v-8.129c-.05-4.165-2.358-5.57-6.021-3.663-.602.301-1.154.653-1.807 1.004V35.426c0 1.857.1 1.907 1.907 2.007.2 0 .351.05.653.1.05.352.05.653.1 1.155h-8.982v-1.104c.853-.15 1.656-.25 2.559-.402.05-.602.15-1.053.15-1.555v-9.785c0-1.254-.25-2.358-1.555-2.91-.301-.15-.452-.502-.853-1.004 1.957-.702 3.713-1.305 5.72-2.007.15.953.251 1.756.402 2.76.35-.201.652-.352.903-.552 1.455-1.004 2.96-1.857 4.767-2.007 2.358-.251 4.366.401 5.37 2.86.953-.602 1.705-1.255 2.608-1.656 1.255-.552 2.56-1.104 3.864-1.204 3.011-.201 4.968 1.555 5.169 4.566.15 2.71.1 5.42.1 8.129v2.56c0 1.856.15 1.956 2.007 2.107.15 0 .301.05.552.1 0 .351.05.702.1 1.154-3.01-.2-5.82-.2-8.78-.2zM18.115 11.892v10.89c2.157 0 4.265.1 6.322-.05 1.154-.101 1.606-1.155 1.857-2.209.1-.401.401-.753.602-1.104l.452.15v9.033c-.15.05-.452.1-.753.2-.1-.3-.15-.45-.2-.652-.302-2.76-.804-3.16-3.563-3.16h-4.767v7.325c0 .753.05 1.456.15 2.208.15 1.556.703 2.359 2.208 2.409 2.409.05 4.817 0 7.176-.301 1.957-.251 2.96-1.807 3.713-3.513.15-.351.3-.652.502-1.054.35.05.652.15 1.154.201-.552 2.158-1.104 4.215-1.656 6.323H10.136c-.05-.402-.05-.753-.1-1.154.552-.05.953-.1 1.405-.151 1.706-.2 2.258-.753 2.358-2.509.05-1.204.05-2.459.05-3.663 0-5.57 0-11.09-.05-16.66 0-2.207-.3-2.458-2.559-2.76-.25-.05-.502-.05-.752-.1-.1 0-.201-.1-.402-.2 0-.302-.05-.653-.05-1.104h19.921v6.222c-.1.05-.25.15-.351.2-.251-.25-.703-.451-.753-.752-.552-2.96-2.509-4.115-5.319-4.115-1.857 0-3.563.05-5.42.05zM145.62 24.186V36.08c0 .752.452 1.154 1.204 1.204.452 0 .853.05 1.405.05.051.401.051.753.101 1.204h-8.832v-1.104c.853-.15 1.606-.25 2.359-.401.1-.401.15-.652.15-.903v-10.89c0-1.003-.552-1.555-1.405-1.906-.552-.25-1.104-.552-.753-1.405 1.757-.652 3.513-1.254 5.52-2.007.101.953.201 1.756.301 2.76.703-.452 1.305-.853 1.857-1.204 1.806-1.105 3.763-1.807 5.921-1.406 2.208.402 3.613 2.158 3.663 4.667.1 3.513.1 7.025.1 10.538 0 1.957 0 1.957 1.957 2.057.151 0 .301.05.552.1v1.205h-8.681c0-.402-.05-.753-.05-1.154.803-.1 1.455-.201 2.308-.302.051-.551.201-1.103.201-1.605v-9.534c0-2.61-1.756-4.065-4.315-3.362-1.104.25-2.308.953-3.563 1.505zM136.989 29.505c0 5.37-4.265 9.785-9.434 9.785-5.67 0-9.935-4.165-9.935-9.634.05-5.52 4.165-9.785 9.534-9.735 5.771 0 9.835 4.014 9.835 9.584zm-4.064.552c.05-2.308-.904-5.319-2.158-6.874-2.158-2.56-5.369-2.51-7.326.05-2.66 3.462-2.158 10.286.903 13.297 1.957 1.907 4.918 1.756 6.624-.351 1.455-1.756 1.906-3.914 1.957-6.122zM71.857 27.598c-.753 2.81.552 6.574 2.81 8.03 3.161 2.056 5.67.4 8.028-1.657.151.05.251 0 .352.05.15.15.3.301.401.452-1.304 2.76-4.767 4.867-7.778 4.767-3.311-.1-5.67-1.857-6.924-5.118-1.556-4.065-.502-9.334 2.458-12.043 3.463-3.212 9.133-2.71 11.29 1.104.753 1.304 1.055 2.66.603 4.415H71.857zm7.577-1.806c.3-1.455 0-2.66-1.054-3.513-1.204-1.003-2.66-.953-3.964-.25-1.505.752-2.258 2.107-2.459 3.763h7.477zM102.014 33.118c.352-.1.602-.2.904-.3.25.651.451 1.254.702 1.806.953 2.258 3.011 3.362 5.269 2.91 1.907-.351 2.91-2.61 1.656-4.115-.753-.903-1.957-1.505-3.011-2.157-.903-.552-1.907-.954-2.81-1.506-1.957-1.254-2.71-3.11-2.308-5.369.401-2.258 1.907-3.563 4.014-4.165 2.409-.702 4.667-.2 7.025.903.1 1.355.201 2.71.301 4.266-.451.05-.752.1-1.104.1-.251-.602-.401-1.154-.602-1.656-.853-1.957-3.111-2.86-5.118-2.007-1.756.753-2.258 2.66-.903 3.964.953.903 2.208 1.405 3.362 2.057.702.402 1.455.703 2.208 1.054 1.956.954 3.06 2.56 3.01 4.767-.05 2.258-1.254 3.914-3.261 4.767-2.961 1.355-5.922.954-8.882-.652-.151-1.455-.301-3.01-.452-4.667zM86.559 22.33c1.706-.803 3.412-1.656 5.42-2.61.1 1.406.15 2.51.2 3.915.502-.653.803-1.054 1.104-1.405.853-1.054 1.857-1.907 3.212-2.208 1.706-.402 3.11.652 3.11 2.258 0 1.756-1.505 2.66-3.06 1.907-2.409-1.205-4.316 0-4.316 2.76v8.78c0 1.356.251 1.607 1.656 1.607h2.409v1.254H85.756c-.05-.351-.1-.702-.15-1.204.652-.05 1.204-.1 1.706-.1.853 0 1.355-.402 1.355-1.255 0-3.663.05-7.326-.05-10.99 0-.501-.753-1.053-1.205-1.555-.301-.3-.652-.502-1.004-.753.05-.15.1-.3.151-.401zM48.373 55.147c-.05-3.261 2.208-5.57 5.419-5.62 3.212-.05 5.57 2.308 5.57 5.62 0 3.162-2.308 5.52-5.52 5.57-3.11.05-5.47-2.308-5.47-5.57zm9.634.1c.1-2.508-1.606-4.415-4.064-4.465-2.46-.1-4.266 1.656-4.366 4.165-.1 2.559 1.606 4.465 4.115 4.566 2.408.1 4.265-1.706 4.315-4.265zM121.032 58.86v-3.01l-2.258-.151v-1.054h3.463v4.918c-1.957 1.756-6.223 1.455-7.979-.602-2.057-2.409-1.806-6.323.502-8.23 2.208-1.806 5.77-1.656 7.376.402-.201.25-.451.501-.652.752-3.212-1.555-5.068-1.405-6.523.502-1.155 1.556-1.054 4.215.2 5.72 1.255 1.506 3.864 1.857 5.871.753zM99.054 59.211h5.218v1.154h-6.623V49.928h6.372l.05 1.054h-5.068v3.312l4.868.05.05 1.154h-4.867v3.713zM133.577 59.211h5.219v1.154h-6.624V49.928h6.373l.05 1.054h-5.018v3.312l4.817.05.05 1.154h-4.867v3.713zM39.39 57.957c.302.2.553.401.753.602-.752 1.706-2.71 2.459-5.068 2.007-2.459-.451-4.165-2.458-4.265-4.967-.15-3.061 1.305-5.169 4.014-5.871 2.108-.552 4.215.1 5.018 1.656-.25.2-.502.451-.702.652-2.61-2.208-4.918-1.255-6.172.25-1.355 1.657-1.155 4.517.35 6.022 1.657 1.656 3.764 1.556 6.073-.35zM68.495 60.365V49.827l1.204-.05v9.434h4.767v1.154h-5.971zM84.301 59.262h4.817v1.104h-5.92V49.828h1.053l.05 9.434z"
              />
            </svg>
          </div>
          <LicensePrivacy />

          <div className="lg:hidden">
            <GetInTouch />
          </div>
        </div>
        <div className="mt-4 px-6 md:px-16 xl:px-24 flex flex-col justify-between min-w-[640px]">
          <div className="hidden lg:block mb-5">
            <GetInTouch />
          </div>
          {/* Newsletter signup */}
          <h3 className="uppercase font-extrabold text-xl">Newsletters</h3>
          <div id="newsletter">
            <form onSubmit={SubmitEmail}>
              <div className="py-6 w-full">
                {status === 'already_subscribed' && (
                  <span className="text-green-blue">
                    You are already subscribed. Nice! 😎
                  </span>
                )}{' '}
                {status === 'tags_modified' && (
                  <span className="text-purple text-lg">
                    Your preferences have been updated. ✏️
                  </span>
                )}
                {status === 'success' && (
                  <span className="text-purple text-lg">
                    Thanks for joining! 😍
                  </span>
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
                      <div className="flex flex-col w-full text-sm">
                        <label className="flex flex-row w-full">
                          <Checkbox id="monthly" />
                          <span className="ml-2 lg:flex lg:gap-x-5">
                            <span className="block font-medium">Monthly</span>
                            <span className="font-light">
                              Engagement Lab Newsletter
                            </span>
                          </span>
                        </label>
                        <label className="flex flex-row w-full">
                          <Checkbox id="tngv" />
                          <span className="ml-2 lg:flex lg:gap-x-2">
                            <span className="block font-medium">Quarterly</span>
                            <span className="font-light">
                              Transforming Narratives of Gun Violence Newsletter
                            </span>
                          </span>
                        </label>
                        <label className="flex flex-row w-full">
                          <Checkbox id="tnej" />
                          <span className="ml-2 lg:flex lg:gap-x-2">
                            <span className="block font-medium">Quarterly</span>
                            <span className="font-light">
                              Transforming Narratives for Environmental Justice
                              Newsletter
                            </span>
                          </span>
                        </label>
                        <div className="relative w-full mt-3">
                          <div className="absolute w-full h-8 border-yellow border-2 mt-1 ml-1"></div>
                          <input
                            type="email"
                            placeholder="Your email"
                            name="EMAIL"
                            id="email"
                            width="800"
                            aria-label="Enter your email"
                            minLength={5}
                            required
                            disabled={submitted}
                            className=" absolute w-full h-8 bg-[rgba(255,255,255,0)] border-2 border-slate p-3 placeholder:text-slate shadow-[16px_20px_0px_0px_#2d3748]1"
                          />
                        </div>

                        <button
                          type="submit"
                          aria-label="Subscribe"
                          className="group relative my-12"
                        >
                          <div className="absolute w-24 h-8 border-yellow border-2 mt-1 ml-1 bg-yellow bg-opacity-0 group-hover:bg-opacity-25"></div>
                          <div className="absolute w-24 h-8 bg-[rgba(255,255,255,0)] border-2 border-yellow py-2">
                            Sign up
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
        <p className="absolute flex flex-row gap-x-2 bottom-0 right-0 px-6 py-5 text-sm items-center">
          <span className="italic">ELab Home</span> v{packageInfo.version}
          <a
            href="https://github.com/engagementlab"
            role="link"
            aria-label="Link to the Engagement Lab's Github repo for elab home app"
            className={`transition-all hover:scale-110 hover:opacity-40 ${CustomEase}`}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-6 w-6 fill-slate-900"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"
              ></path>
            </svg>
          </a>
        </p>
      </nav>
    </div>
  );
};

export default Footer;
