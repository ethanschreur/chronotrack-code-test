import React from "react"
import { useEffect, useState } from 'react';
import { toHhMmSs } from "../time";
import resultsApi from "./resultsApi";
import { RankedResult } from './types';
import { useAppSelector } from "../app/hooks";
import { selectResults, updateResults } from "./resultsSlice";
import { useAppDispatch } from "../app/hooks"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Results = () => {
  const store = useAppSelector(selectResults);
  const dispatch = useAppDispatch()

  const fetchData: () => void = async () => {
    dispatch(updateResults(await resultsApi.getResults()));
  };

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
      <div className='results' data-testid='results' style={{ width: '100%', maxWidth: 650 }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Bib</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Rank</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {store.data.map((x: RankedResult) => (
                <TableRow key={x.bib}>
                  <TableCell>{x.bib}</TableCell>
                  <TableCell>{x.name}</TableCell>
                  <TableCell>{toHhMmSs(x.time)}</TableCell>
                  <TableCell>{x.rank}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default Results;

