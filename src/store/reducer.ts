import { createReducer } from '@reduxjs/toolkit';
import { setGenre, getFilmsByType, getFilmsShown, resetFilms, fetchFilms } from './action';
import { FilmInfo } from '../types/films';

//type Genre = 'All genres' | 'Comedies' | 'Crime' | 'Documentary' | 'Dramas' | ''

type State = {
  genre: string;
  films: FilmInfo[];
  filmsByType: FilmInfo[];
  filmsShown: FilmInfo[];
  isActiveShowMoreButton: boolean;
  isFilmsStateLoading: boolean;
}

const initialState: State = {
  genre: 'All genres',
  films: [],
  filmsByType: [],
  filmsShown: [].slice(0, 8),
  isActiveShowMoreButton: true,
  isFilmsStateLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(fetchFilms.pending, (state) => {
      state.isFilmsStateLoading = true;
    })
    .addCase(fetchFilms.fulfilled, (state, action) => {
      state.films = action.payload;
      state.isFilmsStateLoading = false;
    })
    .addCase(fetchFilms.rejected, (state) => {
      state.isFilmsStateLoading = false;
    })
    .addCase(getFilmsByType, (state, action) => {
      state.filmsByType = (action.payload !== 'All genres') ? state.films.filter((film) => film.genre === state.genre) : state.films;
    })
    .addCase(getFilmsShown, (state, action) => {
      if (state.filmsByType.length > action.payload) {
        state.filmsShown = state.filmsByType.slice(0, action.payload);
        state.isActiveShowMoreButton = true;
      } else {
        state.filmsShown = state.filmsByType;
        state.isActiveShowMoreButton = false;
      }
    })
    .addCase(resetFilms, (state) => {
      state.filmsShown = state.filmsByType;
    });
});
