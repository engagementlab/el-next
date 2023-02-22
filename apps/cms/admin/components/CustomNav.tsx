import type { NavigationProps } from '@keystone-6/core/admin-ui/components';
import {
  NavigationContainer,
  NavItem,
} from '@keystone-6/core/admin-ui/components';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  Button,
} from '@mui/material';

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import WebOutlinedIcon from '@mui/icons-material/WebOutlined';

import React, { useEffect, useState } from 'react';
import create from 'zustand';

// import app from '../../currentApp';

const apps = [
  {
    key: 'tngvi',
    name: 'TNGVI',
    apexUrl: 'transformnarratives.org',
    logo: () => {
      return (
        <svg viewBox="88.575 264.575 25 49.225" width="25" height="49.225">
          <g
            transform="matrix(0.015693, 0, 0, -0.015693, 74.675285, 313.988312)"
            fill="#000000"
            stroke="none"
          >
            <path
              d="M1004 3136 c-71 -31 -115 -134 -118 -273 -2 -120 8 -196 38 -289 32
                          -99 76 -248 81 -271 5 -26 28 -111 72 -263 22 -74 50 -183 63 -242 l24 -107
                          -23 -83 c-22 -82 -38 -119 -122 -273 -23 -44 -57 -123 -75 -175 -34 -100 -33
                          -95 -19 -305 7 -107 100 -313 250 -552 102 -163 139 -204 220 -244 75 -37 137
                          -47 290 -47 279 0 405 72 481 274 14 37 32 99 40 138 36 172 88 358 130 465
                          25 64 47 123 50 131 2 8 17 60 34 115 36 118 46 188 32 237 -8 29 -6 44 10 79
                          51 112 -20 233 -132 225 -27 -2 -53 -7 -58 -10 -6 -3 -3 15 5 42 17 56 11 154
                          -13 190 -31 47 -139 78 -202 58 -20 -7 -21 -5 -12 16 11 24 51 163 76 263 36
                          143 54 209 98 360 60 201 75 278 69 356 -12 199 -218 263 -356 110 -58 -64
                          -84 -128 -132 -321 -32 -129 -69 -261 -100 -360 -13 -41 -36 -115 -51 -165
                          -26 -90 -70 -185 -85 -185 -17 0 -38 33 -63 97 -39 105 -113 340 -131 418 -27
                          116 -124 414 -155 474 -34 68 -62 99 -106 117 -41 17 -70 17 -110 0z m91 -102
                          c40 -40 83 -160 174 -484 145 -514 187 -603 289 -617 58 -8 94 21 136 110 49
                          104 179 519 192 613 2 17 18 77 34 134 51 172 97 243 165 256 100 18 131 -65
                          93 -242 -18 -82 -82 -318 -179 -654 -46 -160 -42 -143 -67 -251 -12 -48 -32
                          -111 -45 -140 -23 -49 -86 -244 -92 -278 -3 -20 -16 -26 -125 -56 -88 -23
                          -271 -104 -330 -146 -26 -18 -275 -179 -298 -193 -31 -19 2 75 77 219 156 297
                          164 348 93 630 -23 94 -47 181 -52 195 -5 14 -29 97 -55 185 -25 88 -59 205
                          -75 260 -37 126 -40 139 -45 258 -4 80 -1 106 15 149 26 69 59 87 95 52z
                          m1080 -1166 c25 -20 27 -26 22 -73 -3 -31 -24 -93 -50 -151 -25 -54 -48 -108
                          -51 -119 -5 -16 -15 -20 -48 -20 -24 -1 -66 -4 -94 -8 l-51 -7 34 112 c51 169
                          76 214 148 262 46 32 55 32 90 4z m203 -281 c18 -14 15 -89 -7 -139 -26 -60
                          -214 -340 -261 -387 -40 -40 -83 -55 -113 -40 -16 9 -13 15 28 55 52 53 90
                          114 100 164 4 19 19 57 32 84 22 43 24 54 14 85 -9 31 -8 43 14 86 44 90 137
                          135 193 92z m-305 -191 c4 -9 4 -23 1 -31 -9 -23 -150 -113 -189 -121 -61 -11
                          -118 26 -130 85 -2 13 1 21 11 21 18 0 10 -2 110 29 105 32 189 39 197 17z
                          m-403 -141 c0 -21 53 -66 106 -91 73 -34 123 -29 229 24 6 3 1 -5 -10 -17 -29
                          -34 -97 -71 -186 -102 -85 -30 -139 -67 -283 -198 -50 -45 -95 -80 -100 -79
                          -23 4 -56 -14 -56 -30 0 -20 12 -42 63 -116 43 -63 70 -77 98 -49 16 15 17 24
                          9 55 -6 20 -17 41 -25 48 -12 10 0 25 72 93 102 98 201 168 264 188 43 14 46
                          14 61 -7 21 -27 96 -48 148 -41 59 8 88 34 190 176 51 72 95 129 98 127 4 -4
                          -14 -56 -112 -325 -31 -85 -70 -211 -86 -280 -17 -69 -40 -164 -52 -211 -57
                          -237 -137 -307 -358 -314 -132 -4 -253 10 -303 36 -22 11 -56 37 -76 58 -47
                          50 -153 220 -204 328 -21 47 -52 105 -68 130 -52 82 -78 202 -57 262 13 39 46
                          67 185 159 178 117 341 210 413 233 14 5 38 -31 40 -57z"
              style={{ fill: 'rgb(141, 51, 210)' }}
            ></path>
          </g>
        </svg>
      );
    },
  },
  // {
  //   key: 'elab',
  //   name: 'ELab Home',
  //   logo: () => {
  //     return (
  //       <svg viewBox="0 0 25 25" width="25" height="25">
  //         <path
  //           fill="#000"
  //           fill-rule="evenodd"
  //           d="M 25 12.5 C 25 19.404 19.404 25 12.5 25 C 5.596 25 0 19.404 0 12.5 C 0 5.596 5.596 0 12.5 0 C 19.404 0 25 5.596 25 12.5 Z"
  //           clip-rule="evenodd"
  //         ></path>
  //         <path
  //           fill="#F6A536"
  //           fill-rule="evenodd"
  //           d="M 10.027 6.426 L 10.033 16.495 L 17.263 16.495 L 17.263 18.574 L 7.746 18.574 L 7.746 6.448 L 10.027 6.426 L 10.027 6.426 Z"
  //           clip-rule="evenodd"
  //         ></path>
  //         <path
  //           fill="#00AB9E"
  //           fill-rule="evenodd"
  //           d="M 10.027 11.493 L 10.027 13.589 L 17.263 13.589 L 17.263 11.51 L 10.027 11.493 L 10.027 11.493 Z"
  //           clip-rule="evenodd"
  //         ></path>
  //         <path
  //           fill="#F72923"
  //           fill-rule="evenodd"
  //           d="M 10.027 6.426 L 10.027 8.521 L 17.263 8.521 L 17.263 6.443 L 10.027 6.426 L 10.027 6.426 Z"
  //           clip-rule="evenodd"
  //         ></path>
  //       </svg>
  //     );
  //   },
  // },
  {
    key: 'sjm',
    name: 'SJ+M',
    apexUrl: 'sjmsymposium.org',
    logo: () => {
      return (
        <img
          src="https://res.cloudinary.com/engagement-lab-home/image/upload/c_scale,w_25/v1667943163/sjm/icon.png"
          alt="SJM logo"
        />
      );
    },
  },
];

const listMapping = new Map<string, string>([
  ['Abouts', 'About Page'],
  ['Big Pictures', 'Big Picture Page'],
  ['Communities', 'Community Page'],
  ['Homes', 'Home'],
]);

type DrawerState = {
  drawerOpen: boolean;
  toggleDrawer: (open: boolean) => void;
};
// Create store with Zustand
const useStore = create<DrawerState>((set) => ({
  drawerOpen: false,
  toggleDrawer: (open: boolean) =>
    set({
      drawerOpen: open,
    }),
}));

export function CustomNavigation({
  authenticatedItem,
  lists,
}: NavigationProps) {
  const [appPath, setAppPath] = useState('');

  useEffect(() => {
    setAppPath(window.location.pathname.replace('/', '') || 'tngvi');
  }, []);

  const toggleDrawer = useStore((state) => state.toggleDrawer);
  const isOpen = useStore((state) => state.drawerOpen);
  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      // onClick={toggleDrawer(false) as unknown as MouseEventHandler<HTMLDivElement>}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <Divider />
      <List>
        {apps.map(
          (value: { key: string; name: string; logo: () => JSX.Element }) => {
            return (
              <ListItem
                key={value.key}
                disablePadding
                component="a"
                href={`/${value.key}`}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <value.logo />
                  </ListItemIcon>
                  <ListItemText primary={value.name} />
                </ListItemButton>
              </ListItem>
            );
          }
        )}
      </List>
    </Box>
  );

  const app = apps.filter((app) => app.key === appPath)[0];

  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      {app && (
        <>
          {' '}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          >
            <Button
              variant="outlined"
              style={{
                color: '#00a497',
                borderColor: '#00a497',
                maxHeight: '40px',
              }}
              onClick={() => {
                toggleDrawer(true);
              }}
            >
              <MenuOutlinedIcon />
            </Button>
            {appPath && (
              <h3
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}
              >
                <app.logo />
                <span style={{ paddingLeft: '1rem' }}>
                  {apps.filter((app) => app.key === appPath)[0]['name']}
                </span>
              </h3>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
          >
            <Button
              component="a"
              href={`https://qa.${app.apexUrl}`}
              target="_blank"
              style={{
                color: '#3b82f6',
                maxHeight: '40px',
              }}
            >
              <WebOutlinedIcon style={{ paddingRight: '.5rem' }} />
              View QA
            </Button>
          </div>
        </>
      )}
      <hr style={{ width: '85%', borderWidth: '1px', borderColor: 'grey' }} />
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={() => {
          toggleDrawer(false);
        }}
      >
        {/* <div style={{ width: '80px' }}>
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
        <h1 style={{ fontSize: 'large' }}>
          Engagement Lab <br />
          Content Management
        </h1> */}
        {list()}
      </Drawer>
      <NavItem href="/">Dashboard</NavItem>

      {lists.map((list, i) => {
        return (
          <NavItem key={i} href={`/${list.path}`}>
            {listMapping.get(list.label)
              ? listMapping.get(list.label)
              : list.label}
          </NavItem>
        );
      })}
      <hr style={{ width: '85%', borderWidth: '1px', borderColor: 'grey' }} />
      <NavItem href="/media">
        <span>Media Library</span>
      </NavItem>
      <NavItem href="/deploy">
        <span style={{ color: '#f6a536' }}>Deploy</span>
      </NavItem>
    </NavigationContainer>
  );
}
