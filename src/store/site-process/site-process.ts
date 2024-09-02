import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SiteProcess } from '../../types/state';
import { StoreSlice } from '../../const';

const initialState: SiteProcess = {
  genre: 'All genres',
};

export const siteProcess = createSlice({
  name: StoreSlice.SiteProcess,
  initialState,
  reducers: {
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    }
  }
});

export const { setGenre } = siteProcess.actions;
