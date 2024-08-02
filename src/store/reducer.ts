import { createReducer } from '@reduxjs/toolkit';
import { setGenre, getFilmsByType, getFilmsShown, resetFilms } from './action';
import { FilmInfo } from '../types/films';
import { films } from '../mocks/films';

//type Genre = 'All genres' | 'Comedies' | 'Crime' | 'Documentary' | 'Dramas' | ''

type State = {
  genre: string;
  films: FilmInfo[];
  filmsByType: FilmInfo[];
  filmsShown: FilmInfo[];
  isActiveShowMoreButton: boolean;
}

const initialState: State = {
  genre: 'All genres',
  films: films,
  filmsByType: films,
  filmsShown: films.slice(0, 8),
  isActiveShowMoreButton: true,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
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
