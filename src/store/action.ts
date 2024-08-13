import type { AxiosInstance } from 'axios';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { FilmInfo } from '../types/films';
import type { User, UserAuth } from '../types/types';
import { AppRoute } from '../const';
import { Token } from '../components/token/token';

const Action = {
  SET_GENRE: 'films/set-genre',
  SET_FILMS_SHOWN: 'films/set-shown',
  SET_IS_ACTIVE: 'set-is-active',
  FETCH_FILMS: 'films/fetch',
  LOGIN_USER: 'user/login',
  FETCH_USER_STATUS: 'user/fetch/status',
};

export const setGenre = createAction<string>(Action.SET_GENRE);
export const setFilmsShown = createAction<number>(Action.SET_FILMS_SHOWN);
export const setIsActive = createAction<boolean>(Action.SET_IS_ACTIVE);

export const fetchFilms = createAsyncThunk<FilmInfo[], undefined, { extra: AxiosInstance }>(
  Action.FETCH_FILMS,
  async (_, { extra: api }) => {
    const { data } = await api.get<FilmInfo[]>(AppRoute.Films);
    return data;
  }
);

export const fetchUserStatus = createAsyncThunk<User, undefined, { extra: AxiosInstance }>(
  Action.FETCH_USER_STATUS,
  async (_, { extra: api }) => {
    const { data } = await api.get<User>(AppRoute.Login);
    return data;
  }
);

export const loginUser = createAsyncThunk<UserAuth['email'], UserAuth, { extra: AxiosInstance }>(
  Action.LOGIN_USER,
  async ({ email, password }, { extra: api }) => {
    const { data } = await api.post<User>(AppRoute.Login, { email, password });
    const { token } = data;
    Token.save(token);
    window.history.back();

    return email;
  }
);
