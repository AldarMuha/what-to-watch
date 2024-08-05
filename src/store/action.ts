import type { AxiosInstance } from 'axios';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { FilmInfo } from '../types/films';
import { AppRoute } from '../const';

export const setGenre = createAction<string>('films/setGanre');
export const getFilmsByType = createAction<string>('films/getFilmsByType');
export const getFilmsShown = createAction<number>('films/getFilmsShown');
export const resetFilms = createAction('films/resetFilms');

export const fetchFilms = createAsyncThunk(
  'films/fetch',
  async (_, thunkAPI) => {
    const axios = thunkAPI.extra as AxiosInstance;
    const { data } = await axios.get<FilmInfo[]>(AppRoute.Films);
    return data;
  }
);
