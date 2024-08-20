import type { AxiosInstance } from 'axios';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { FilmInfo } from '../types/films';
import { AppRoute } from '../const';
import { User, UserAuth } from '../types/types';
import { Token } from '../utils/token';
import { History } from 'history';
import { AuthorizationStatus } from '../const';
//import { State, AppDispatch } from '../types/state';

type Extra = {
  api: AxiosInstance;
  history: History;
}

const Action = {
  SET_GENRE: 'films/set-genre',
  SET_FILMS_SHOWN: 'films/set-shown',
  SET_IS_ACTIVE: 'set-is-active',
  FETCH_FILMS: 'films/fetch',
  LOGIN_USER: 'user/login',
  FETCH_USER_STATUS: 'user/fetch/status',
  REQUIRE_AUTHORIZATION: 'user/requireAuthorization',
};

export const requireAuthorization = createAction<AuthorizationStatus>(Action.REQUIRE_AUTHORIZATION);

export const setGenre = createAction<string>(Action.SET_GENRE);
export const setFilmsShown = createAction<number>(Action.SET_FILMS_SHOWN);
export const setIsActive = createAction<boolean>(Action.SET_IS_ACTIVE);

export const fetchFilms = createAsyncThunk<FilmInfo[], undefined, { extra: Extra }>(
  Action.FETCH_FILMS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<FilmInfo[]>(AppRoute.Films);
    return data;
  }
);

export const fetchUserStatus = createAsyncThunk<User, undefined, { extra: Extra }>(
  Action.FETCH_USER_STATUS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<User>(AppRoute.Login);
    return data;
  }
);

export const loginUser = createAsyncThunk<UserAuth['email'], UserAuth, { extra: Extra }>(
  Action.LOGIN_USER,
  async ({ email, password }, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.post<User>(AppRoute.Login, { email, password });
    const { token } = data;

    Token.save(token);
    history.back();
    return email;
  });
/*
export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(AppRoute.Logout);
    Token.drop();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
*/
