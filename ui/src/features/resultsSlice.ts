import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store';
import { RankedResult } from './types';

export interface ResultsState {
  data: RankedResult[]
}

export const INITIAL_STATE: ResultsState = {
  data: []
}

export const resultsSlice = createSlice({
  name: 'results',
  initialState: INITIAL_STATE,
  reducers: {
    updateResults: (state, action: PayloadAction<RankedResult[]>) => {
      state.data = action.payload;
    }
  }
})

export const selectResults = (state: RootState) => state.results

export const { updateResults } = resultsSlice.actions

export default resultsSlice.reducer