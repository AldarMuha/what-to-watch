import type { AxiosError, AxiosInstance } from 'axios';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { FilmInfo } from '../types/films';
import { AppRoute } from '../const';
import { User, UserAuth } from '../types/types';
import { Token } from '../utils/token';
import { History } from 'history';
import { AuthorizationStatus } from '../const';
//import { State, AppDispatch } from '../types/state';
import { HttpCode } from '../const';
import { Comment, NewComment, FavoriteAuth } from '../types/types';

type Extra = {
  api: AxiosInstance;
  history: History;
}

const Action = {
  SET_GENRE: 'films/set-genre',
  SET_FILMS_SHOWN: 'films/set-shown',
  SET_FILMS_BY_GENRE: 'films/set-by-genre',
  SHOW_MORE_FILMS: 'films/show-more',
  FETCH_FILMS: 'films/fetch',
  FETCH_FILM: 'film/fetch',
  LOGIN_USER: 'user/login',
  FETCH_USER_STATUS: 'user/fetch/status',
  REQUIRE_AUTHORIZATION: 'user/requireAuthorization',
  FETCH_COMMENTS: 'film/fetch-comments',
  SIMILAR_FILMS: 'films/similar',
  POST_COMMENT: 'user/post-comment',
  FETCH_PROMO_FILM: 'film/get-promo-film',
  FETCH_FAVORITE_FILMS: 'films/fetch-favorite',
  POST_FAVORITE_FILMS: 'films/post-favorite',
};

export const requireAuthorization = createAction<AuthorizationStatus>(Action.REQUIRE_AUTHORIZATION);

//export const setGenre = createAction<string>(Action.SET_GENRE);
export const setFilmsShown = createAction<number>(Action.SET_FILMS_SHOWN);
export const setFilmsByGenre = createAction<string>(Action.SET_FILMS_BY_GENRE);
export const showMoreFilms = createAction(Action.SHOW_MORE_FILMS);

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

export const fetchFilm = createAsyncThunk<FilmInfo, FilmInfo['id'], { extra: Extra }>(
  Action.FETCH_FILM,
  async (id, { extra }) => {
    const { api, history } = extra;
    try {
      const { data } = await api.get<FilmInfo>(`${AppRoute.Films}/${id}`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === HttpCode.NotFound) {
        history.push(AppRoute.NotFound);
      }
      return Promise.reject(error);
    }
  });

export const fetchComments = createAsyncThunk<Comment[], FilmInfo['id'], { extra: Extra }>(
  Action.FETCH_COMMENTS,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<Comment[]>(`${AppRoute.Comments}/${id}`);
    return data;
  }
);

export const fetchSimilarFilms = createAsyncThunk<FilmInfo[], FilmInfo['id'], { extra: Extra }>(
  Action.SIMILAR_FILMS,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<FilmInfo[]>(`${AppRoute.Films}/${id}/similar`);
    return data;
  }
);

export const postReview = createAsyncThunk<Comment[], NewComment, { extra: Extra }>(
  Action.POST_COMMENT,
  async ({ id, comment, rating }, { extra }) => {
    const { api } = extra;
    const { data } = await api.post<Comment[]>(`${AppRoute.Comments}/${id}`, { comment, rating });
    return data;
  }
);

export const fetchPromoFilm = createAsyncThunk<FilmInfo, undefined, { extra: Extra }>(
  Action.FETCH_PROMO_FILM,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<FilmInfo>('/promo');
    return data;
  }
);

export const fetchFavoriteFilms = createAsyncThunk<FilmInfo[], undefined, { extra: Extra }>(
  Action.FETCH_FAVORITE_FILMS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<FilmInfo[]>('/favorite');
    return data;
  }
);

export const postFavoriteFilms = createAsyncThunk<FilmInfo, FavoriteAuth, { extra: Extra }>(
  Action.POST_FAVORITE_FILMS,
  async ({ id, status }, { extra }) => {
    const { api, history } = extra;
    try {
      const { data } = await api.post<FilmInfo>(`favorite/${id}/${status}`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === HttpCode.NotFound) {
        history.push(AppRoute.Login);
      }
      return Promise.reject(error);
    }
  }
);
