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
import { create } from 'zustand';

const apps = [
  {
    key: 'elab',
    name: 'ELab Home',
    logo: () => {
      return (
        <svg viewBox="0 0 25 25" width="25" height="25">
          <path
            fill="#000"
            fill-rule="evenodd"
            d="M 25 12.5 C 25 19.404 19.404 25 12.5 25 C 5.596 25 0 19.404 0 12.5 C 0 5.596 5.596 0 12.5 0 C 19.404 0 25 5.596 25 12.5 Z"
            clip-rule="evenodd"
          ></path>
          <path
            fill="#fff"
            fill-rule="evenodd"
            d="M 10.027 6.426 L 10.033 16.495 L 17.263 16.495 L 17.263 18.574 L 7.746 18.574 L 7.746 6.448 L 10.027 6.426 L 10.027 6.426 Z"
            clip-rule="evenodd"
          ></path>
          <path
            fill="#fff"
            fill-rule="evenodd"
            d="M 10.027 11.493 L 10.027 13.589 L 17.263 13.589 L 17.263 11.51 L 10.027 11.493 L 10.027 11.493 Z"
            clip-rule="evenodd"
          ></path>
          <path
            fill="#fff"
            fill-rule="evenodd"
            d="M 10.027 6.426 L 10.027 8.521 L 17.263 8.521 L 17.263 6.443 L 10.027 6.426 L 10.027 6.426 Z"
            clip-rule="evenodd"
          ></path>
        </svg>
      );
    },
  },
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
    setAppPath(
      window.location.pathname.replace('/', '').split('/')[0] || 'tngvi'
    );
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
      <NavItem href="/links">
        <span>URL Shortener</span>
      </NavItem>
      <NavItem href="/deploy">
        <span style={{ color: '#f6a536' }}>Deploy</span>
      </NavItem>
    </NavigationContainer>
  );
}
