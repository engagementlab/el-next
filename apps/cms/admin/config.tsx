import React from 'react';
import { CustomNavigation } from './components/elab/CustomNav';
import { Global, css } from '@emotion/core';

// admin/config.tsx
function CustomLogo() {
  // @ts-ignore
  if (typeof tailwind !== 'undefined') {
    // @ts-ignore
    tailwind.config = {
      corePlugins: {
        preflight: false,
      },
    };
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Global
        styles={css`
        nav li a {
          transition: all .2s;
              background: transparent;
            border-bottom-right-radius: 4px;
            border-top-right-radius: 4px;
            color: rgb(107, 114, 128);
            display: block;
            font-weight: 500;
            margin-bottom: 4px;
            margin-right: 24px;
            padding: 8px 24px;
            position: relative;
            text-decoration: none;
        }
          nav li a:hover {
            background-color: black !important;
            color: white !important;
            transform-origin: left;
            translate: 3% 0%;
          }
        }
        [class*='ChromefulComponentBlockElement']{
          button{
            color: black !important;
            background-color: #f6a536 !important;
          }
        }
        [class*='BaseToolbar'] {
          button[data-form-type='action'] {
            color: black !important;
            background-color: #f6a536 !important;
          }
        `}
      />
      <div style={{ width: '80px' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="70"
          fill="none"
          viewBox="0 0 70 70"
        >
          <path
            fill="#000"
            fillRule="evenodd"
            d="M70 35c0 19.33-15.67 35-35 35S0 54.33 0 35 15.67 0 35 0s35 15.67 35 35z"
            clipRule="evenodd"
          />
          <path
            fill="#F6A536"
            fillRule="evenodd"
            d="M28.075 17.992l.018 28.195h20.244v5.82H21.69V18.053l6.385-.06z"
            clipRule="evenodd"
          />
          <path
            fill="#00AB9E"
            fillRule="evenodd"
            d="M28.075 32.18v5.869h20.262v-5.821l-20.262-.048z"
            clipRule="evenodd"
          />
          <path
            fill="#F72923"
            fillRule="evenodd"
            d="M28.075 17.992v5.868h20.262v-5.82l-20.262-.048z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <h1 style={{ fontSize: 'large' }}>Content Management</h1>
    </div>
  );
}

export const components = {
  Logo: CustomLogo,
  Navigation: CustomNavigation,
};
