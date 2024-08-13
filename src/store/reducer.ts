import { createReducer } from '@reduxjs/toolkit';
import { setGenre, setFilmsShown, fetchFilms, setIsActive, fetchUserStatus, loginUser } from './action';
import { FilmInfo } from '../types/films';
import { AuthorizationStatus } from '../const';
import { User } from '../types/types';

type State = {
  genre: string;
  films: FilmInfo[];
  filmsByType: FilmInfo[];
  filmsShown: number;
  isActiveShowMoreButton: boolean;
  isFilmsStateLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: User['email'];
}

const initialState: State = {
  genre: 'All genres',
  films: [],
  filmsByType: [],
  filmsShown: 8,
  isActiveShowMoreButton: true,
  isFilmsStateLoading: false,
  authorizationStatus: AuthorizationStatus.NoAuth,
  user: '',
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
      state.filmsByType = (action.payload !== 'All genres') ? state.films.filter((film) => film.genre === state.genre) : state.films;
      if (state.filmsByType.length <= 8) {
        state.filmsShown = state.filmsByType.length;
        state.isActiveShowMoreButton = false;
      } else {
        state.filmsShown = 8;
        state.isActiveShowMoreButton = true;
      }
    })
    .addCase(fetchFilms.pending, (state) => {
      state.isFilmsStateLoading = true;
    })
    .addCase(fetchFilms.fulfilled, (state, action) => {
      state.films = action.payload;
      state.filmsByType = (state.genre !== 'All genres') ? state.films.filter((film) => film.genre === state.genre) : state.films;
      state.isFilmsStateLoading = false;
      if (state.filmsByType.length <= 8) {
        state.filmsShown = state.filmsByType.length;
        state.isActiveShowMoreButton = false;
      } else {
        state.filmsShown = 8;
        state.isActiveShowMoreButton = true;
      }
    })
    .addCase(fetchFilms.rejected, (state) => {
      state.isFilmsStateLoading = false;
    })
    .addCase(setFilmsShown, (state, action) => {
      state.filmsShown = action.payload;
    })
    .addCase(setIsActive, (state, action) => {
      state.isActiveShowMoreButton = action.payload;
    })
    .addCase(fetchUserStatus.fulfilled, (state, action) => {
      state.user = action.payload.email;
      state.authorizationStatus = AuthorizationStatus.Auth;
    })
    .addCase(fetchUserStatus.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.authorizationStatus = AuthorizationStatus.Auth;
    });
});
