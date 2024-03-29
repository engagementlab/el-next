import React, { Component } from 'react';
import _ from 'lodash';

import { Image } from '@el-next/components';

class Footer extends Component {
  render() {
    return (
      <div className="w-full flex justify-center">
        <div className="w-full xl:w-1/2 text-center">
          <h2
            id="partners"
            className="font-semibold font-sans text-3xl text-blossom mb-6"
          >
            Social Justice + Media Symposium Partners
          </h2>
          <div className="flex flex-col md:flex-row md:flex-wrap justify-around items-center">
            <Image
              id="emerson-logo"
              alt="Emerson College logo"
              imgId="sjm/logos/emerson"
              width={150}
              transforms="f_auto,dpr_auto"
              className="my-5"
            />
            <Image
              id="fiu-logo"
              alt="Florida International University logo"
              imgId="sjm/logos/FIU"
              width={248}
              transforms="f_auto,dpr_auto"
            />
            <Image
              id="ua-logo"
              alt="The University of Arizona logo"
              imgId="sjm/logos/ua"
              width={146}
              transforms="f_auto,dpr_auto"
            />
            <div className="basis-full h-0"></div>
            <Image
              id="um-logo"
              alt="University of Miami logo"
              imgId="sjm/logos/um"
              width={146}
              transforms="f_auto,dpr_auto"
            />
            <svg
              aria-label="Engagement Lab logo"
              width="180"
              height="150"
              fill="none"
              viewBox="0 0 424 150"
            >
              <title>Engagement Lab logo</title>
              <path
                fill="#F6A536"
                fillRule="evenodd"
                d="M413.253 136.248c0-1.934-1.727-3.867-5.18-3.867h-11.108v7.735h11.108c3.395 0 5.18-1.933 5.18-3.868zm-1.44-15.47c0-1.934-1.725-3.869-5.122-3.869h-9.726v7.737h10.014c3.223-.11 4.834-1.99 4.834-3.868zm9.324 15.47c0 5.802-4.374 11.603-13.064 11.603h-19.166v-38.676h17.784c8.691 0 13.006 5.801 13.006 11.658 0 2.487-.805 4.918-2.359 6.963 2.533 2.209 3.799 5.359 3.799 8.452z"
                clipRule="evenodd"
              />
              <path
                fill="#00AB9E"
                fillRule="evenodd"
                d="M400.326 79.953l4.696-13.36 4.697 13.36h-9.393zm15.133 16.33h7.827l-14.35-40.824h-7.827l-14.35 40.825h7.827l2.87-8.166h15.133l2.87 8.166z"
                clipRule="evenodd"
              />
              <path
                fill="#F72923"
                fillRule="evenodd"
                d="M418.989 32.682v7.736h-27.933V1.742h7.605v30.94h20.328z"
                clipRule="evenodd"
              />
              <path
                fill="#000"
                fillRule="evenodd"
                d="M144.176 147.851c-2.587 0-4.909-.51-6.901-1.516-2.183-1.141-3.888-2.811-5.225-5.112-1.781-3.178-2.537-7.559-2.537-14.662 0-16.185-1.258-26.617-3.739-31.004-.981-1.773-1.784-2.466-6.283-2.549v54.595h-12.058v-66.36h11.055c2.883 0 6.221.094 9.364 1.22 3.69 1.335 6.504 3.785 8.607 7.489 3.644 6.512 5.196 17.459 5.196 36.609 0 5.785.636 8.166 1.17 9.144.064.124.114.22.135.244.006.004.205.147 1.216.147.747 0 .747 0 .977-.498.799-1.618 1.199-4.651 1.199-9.037 0-19.149 1.552-30.096 5.193-36.604 1.975-3.638 4.845-6.163 8.523-7.493 3.234-1.127 6.53-1.221 9.366-1.221h11.054v66.36h-12.057V93.007c-4.207.076-5.185.682-6.291 2.564-2.451 4.335-3.646 14.476-3.646 30.99 0 6.498-.721 10.826-2.337 14.031-1.125 2.347-2.81 4.216-4.863 5.387-2.016 1.237-4.42 1.872-7.118 1.872zM126.78 27.362C126.78 10.597 137.414 0 154.07 0c16.657 0 26.161 9.249 26.161 25.05v.77h-12.422v-.962c0-8.094-4.704-13.49-13.739-13.49-9.316 0-14.868 6.937-14.868 15.417v16.571c0 9.25 5.175 15.417 14.868 15.417 9.881 0 13.739-4.915 13.739-13.008v-.674h-15.998V33.914h28.42v11.177c0 16.09-9.128 25.05-26.161 25.05-16.185 0-27.29-9.442-27.29-27.362V27.362zM225.197 42.088l-9.345-29.878h-1.135l-8.032 29.878h18.512zm.105-40.346l19.645 66.609h-12.852l-3.969-14.845h-24.371l-3.969 14.845h-12.852l18.333-66.609h20.035zM251.82 27.362C251.82 10.597 262.789 0 279.969 0c17.181 0 26.985 9.249 26.985 25.05v.77h-12.813v-.962c0-8.094-4.854-13.49-14.172-13.49-9.61 0-15.336 6.937-15.336 15.417v16.571c0 9.25 5.338 15.417 15.336 15.417 10.192 0 14.172-4.915 14.172-13.008v-.674h-16.502V33.914h29.315v11.177c0 16.09-9.415 25.05-26.985 25.05-16.695 0-28.149-9.442-28.149-27.362V27.362zM366.857 1.742v11.419h-38.612v15.891h35.984V40.47h-35.984v16.462h39.176V68.35h-51.568V1.742h51.004zM51.004 1.742v11.419H12.392v15.891h35.984V40.47H12.392v16.462h39.176V68.35H0V1.742h51.004zM240.086 81.243V92.66h-38.612v15.892h35.984v11.418h-35.984v16.462h39.176v11.418h-51.568V81.243h51.004zM369.334 83.667v11.371h-20.286V150h-12.629V95.038h-20.286V83.667h53.201zM0 122.067h83.798v-12.892H0v12.892zM305.11 83.391h-11.792v55.313l-.25-.037c-2.838-.408-4.669-2.128-5.939-5.576-1.471-4.009-1.915-9.548-2.385-15.413l-.085-1.048c-.594-7.64-1.208-15.538-3.971-21.785-1.643-3.658-3.836-6.376-6.693-8.296-2.732-1.886-6.202-2.948-10.31-3.156l-12.292-.002V150h11.792V94.674l.292.032c1.578.174 2.873.647 3.912 1.408 1.217.977 2.189 2.409 3.042 4.453 1.545 4.149 1.916 9.825 2.309 15.833l.054.833c.385 6.789.866 15.238 3.656 21.576 1.639 3.648 3.779 6.312 6.546 8.144 2.694 1.783 5.994 2.806 9.807 3.044l12.307.003V83.391zM116.028 1.742h-11.792v55.312l-.25-.036c-2.839-.408-4.67-2.128-5.94-5.576-1.47-4.009-1.914-9.548-2.385-15.413l-.084-1.049c-.594-7.639-1.208-15.537-3.971-21.784-1.643-3.658-3.837-6.376-6.693-8.296-2.732-1.887-6.202-2.948-10.31-3.156L62.31 1.742v66.609h11.792V13.025l.293.032c1.577.174 2.872.646 3.91 1.407 1.218.978 2.19 2.41 3.044 4.453 1.544 4.149 1.915 9.825 2.308 15.834l.054.833c.386 6.788.866 15.238 3.656 21.576 1.64 3.648 3.78 6.312 6.546 8.144 2.694 1.782 5.994 2.806 9.807 3.044l12.307.003V1.742z"
                clipRule="evenodd"
              />
            </svg>
            <div className="basis-full h-0"></div>
            <Image
              id="mfc-logo"
              alt="Mediaforchange.org logo"
              imgId="sjm/logos/mfc"
              width={408}
              transforms="f_auto,dpr_auto"
            />
            <Image
              id="rwu-logo"
              alt="Roger Williams University logo"
              imgId="sjm/logos/rwu"
              width={211}
              transforms="f_auto,dpr_auto"
            />
            <div className="basis-full h-0"></div>
            <Image
              id="slz-logo"
              alt="Salzburg Global Seminar logo"
              imgId="sjm/logos/salzburg"
              width={211}
              transforms="f_auto,dpr_auto"
            />
            <Image
              id="lau-logo"
              alt="Lebanese American University logo"
              imgId="sjm/logos/lau"
              width={211}
              transforms="f_auto,dpr_auto"
            />
            <div className="basis-full h-0"></div>
            <Image
              id="ivoh-logo"
              alt="IVOH logo"
              imgId="sjm/logos/ivoh"
              width={211}
              transforms="f_auto,dpr_auto"
            />
            <Image
              id="jword-logo"
              alt="JWord logo"
              imgId="sjm/logos/jword"
              width={211}
              transforms="f_auto,dpr_auto"
            />
            <Image
              id="nsc-logo"
              alt="Nevada State University logo"
              imgId="sjm/logos/nsc"
              width={211}
              transforms="f_auto,dpr_auto"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
