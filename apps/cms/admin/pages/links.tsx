import { useEffect, useState } from 'react';
import { PageContainer } from '@keystone-6/core/admin-ui/components';

import {
  Button,
  TextField,
  Switch,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

import axios from 'axios';

import create from 'zustand';
import React from 'react';
import appConfigMap from '../../appConfig';

type PageState = {
  confirmed: boolean;
  waiting: boolean;
  done: boolean;
  data: any[];
  setData: (links: any[]) => void;

  toggleConfirm: () => void;
  toggleWaiting: () => void;
};
export default function Deploy() {
  const endpointPrefix =
    process.env.PRODUCTION_MODE === 'true' ? '/api' : 'http://localhost:8000';

  // Create store with Zustand
  const [useStore] = useState(() =>
    create<PageState>((set) => ({
      confirmed: false,
      waiting: false,
      done: false,
      data: [],
      setData: (data: any[]) =>
        set((state) => {
          return { ...state, data };
        }),
      toggleConfirm: () =>
        set((state) => {
          return { confirmed: !state.confirmed };
        }),
      toggleWaiting: () =>
        set((state) => {
          return { waiting: !state.waiting };
        }),
    }))
  );
  const setData = useStore((state) => state.setData);
  const toggleWaiting = useStore((state) => state.toggleWaiting);

  //   const confirmed = useStore((state) => state.confirmed);
  //   const waiting = useStore((state) => state.waiting);
  //   const done = useStore((state) => state.done);
  const data = useStore((state) => state.data);

  const deployFetch = async () => {
    toggleWaiting();
    // app name is derived from first pathname string
    const app = window.location.pathname.replace('/', '').split('/')[0];
    const response = await axios.post(
      '/api/prod-deploy',
      {
        app,
      },
      {
        withCredentials: true,
      }
    );
    // toggleDone();
  };

  useEffect(() => {
    if (data && data.length > 1) return;
    axios.get(`${endpointPrefix}/links/list`).then((response) => {
      setData(response.data);
      toggleWaiting();
    });
  });

  return (
    <PageContainer header="URL Shortener">
      <h1>URL Shortener</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((link) => (
              <TableRow
                key={link.label}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {link.label}
                </TableCell>
                {/* <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageContainer>
  );
}
