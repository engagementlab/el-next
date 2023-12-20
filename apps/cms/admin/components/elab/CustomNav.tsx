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
  Collapse,
  ListSubheader,
} from '@mui/material';

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import WebOutlinedIcon from '@mui/icons-material/WebOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import React, { useEffect, useState } from 'react';
import { create } from 'zustand';

import '../styles.css';

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

  const listGroups = new Map<string, { label: string; url: string }[]>([
    // ['Initiatives', ['Landings', 'Studios']],
    [
      'Curriculum',
      [
        { label: 'Undergraduate', url: '/undergraduates' },
        { label: 'Graduate', url: '/graduates' },
        { label: 'Learning Partners', url: '/learning-partners' },
      ],
    ],
    [
      'Studios',
      [
        { label: 'Studios', url: '/studios' },
        { label: 'Semesters', url: '/semesters' },
        { label: 'Projects', url: '/studio-projects' },
      ],
    ],
    [
      'Research',
      [
        { label: 'Projects', url: '/research-projects' },
        { label: 'Publications', url: '/publications' },
        { label: 'Partners / Funders', url: '/partners' },
      ],
    ],
    [
      "What's New",
      [
        { label: 'News', url: '/news-items' },
        { label: 'Events', url: '/events' },
      ],
    ],
  ]);
  const listItems = [
    {
      label: 'Blurbs / Landing Pages',
      url: '/initiatives-landings/clj4hyoh90000bn0kcd669525',
    },
    {
      label: 'Filters',
      url: '/filters',
    },
    { label: 'Initiative Landings', url: '/initiatives' },
    {
      label: 'People',
      url: '/people',
    },
    {
      label: 'Slideshows',
      url: '/slideshows',
    },
  ];
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

  const [expanded, setExpanded] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const handleClick = (i: number) => {
    setExpanded(
      expanded.flatMap((v, eI) => {
        return expanded[i] ? false : eI === i;
      })
    );
  };
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

      <List
        sx={{ width: '100%', padding: '8px 10px' }}
        // component="nav"
      >
        {Array.from(listGroups.keys()).map((folderKey, i) => {
          if (listGroups.get(folderKey))
            return (
              <div className={`list-${folderKey}`}>
                <ListItemButton
                  onClick={() => handleClick(i)}
                  sx={{
                    color: 'black',
                    fontWeight: '700',
                    transition: 'all .2s',
                    transformOrigin: 'left',
                    ':hover': {
                      backgroundColor: '#F6A536',

                      translate: '1% 0%',
                    },
                  }}
                >
                  <ListItemText primary={folderKey} />
                  {expanded[i] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={expanded[i]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {listGroups.get(folderKey)?.map((item) => (
                      <ListItemButton
                        sx={{
                          transition: 'all .2s',
                          transformOrigin: 'left',
                          pl: 4,
                          ':hover': {
                            backgroundColor: 'black',
                            color: 'white',

                            translate: '3% 0%',
                          },
                        }}
                        component="a"
                        href={
                          process.env.NODE_ENV === 'production'
                            ? `/elab${item.url}`
                            : item.url
                        }
                        className="navItems"
                      >
                        {/* <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon> */}
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </div>
            );
        })}
        {listItems.map((item) => {
          return (
            <ListItemButton
              component="a"
              href={
                process.env.NODE_ENV === 'production'
                  ? `/elab${item.url}`
                  : item.url
              }
              sx={{
                transition: 'all .2s',
                transformOrigin: 'left',
                // pl: 4,
                ':hover': {
                  backgroundColor: 'black',
                  color: 'white',

                  translate: '3% 0%',
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
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
