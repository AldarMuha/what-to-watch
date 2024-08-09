import type { AxiosInstance } from 'axios';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { FilmInfo } from '../types/films';
import { AppRoute } from '../const';

export const setGenre = createAction<string>('films/setGanre');
export const setFilmsShown = createAction<number>('films/getFilmsShown');
export const setIsActive = createAction<boolean>('setIsActive');

export const fetchFilms = createAsyncThunk(
  'films/fetch',
  async (_, thunkAPI) => {
    const axios = thunkAPI.extra as AxiosInstance;
    const { data } = await axios.get<FilmInfo[]>(AppRoute.Films);
    return data;
  }
);
