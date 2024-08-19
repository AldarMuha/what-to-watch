import type { AxiosInstance } from 'axios';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { FilmInfo } from '../types/films';
import { AppRoute } from '../const';
import { User, UserAuth } from '../types/types';
import { Token } from '../utils/token';
import { AuthorizationStatus } from '../const';
import { History } from 'history';

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
  LOGOUT_USER: 'user/logout',
  FETCH_USER_STATUS: 'user/fetch/status',
  LOAD_FILMS: 'films/load',
  REQUIRE_AUTHORIZATION: 'user/requireAuthorization',
  SET_ERROR: 'films/setError',
  CLEAR_ERROR: 'films/clearError',
};

export const setGenre = createAction<string>(Action.SET_GENRE);
export const setFilmsShown = createAction<number>(Action.SET_FILMS_SHOWN);
export const setIsActive = createAction<boolean>(Action.SET_IS_ACTIVE);

export const loadFilms = createAction<FilmInfo[]>(Action.LOAD_FILMS);
export const requireAuthorization = createAction<AuthorizationStatus>(Action.REQUIRE_AUTHORIZATION);
export const setError = createAction<string | null>(Action.SET_ERROR);

export const fetchFilms = createAsyncThunk<FilmInfo[], undefined, { extra: Extra }>(
  Action.FETCH_FILMS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<FilmInfo[]>(AppRoute.Films);
    return data;
  }
);
/*
export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  Action.FETCH_FILMS,
  async (_, { dispatch, extra: api }) => {
    const { data } = await api.get<FilmInfo[]>(AppRoute.Films);
    dispatch(loadFilms(data));
  },
);
*/
export const fetchUserStatus = createAsyncThunk<User, undefined, { extra: Extra }>(
  Action.FETCH_USER_STATUS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<User>(AppRoute.Login);
    return data;
  }
);

/*
export const fetchUserStatus = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  Action.FETCH_USER_STATUS,
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(AppRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);
*/
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
export const loginAction = createAsyncThunk<void, UserAuth, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<User>(AppRoute.Login, { email, password });
    const { token } = data;
    Token.save(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  },
);
*/
/*
export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  Action.LOGOUT_USER,
  async (_, { dispatch, extra: api }) => {
    await api.delete(AppRoute.LogOut);
    Token.drop();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
/*
export const clearErrorAction = createAsyncThunk(
  Action.CLEAR_ERROR,
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);
*/
