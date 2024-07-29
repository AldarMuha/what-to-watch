import { createReducer } from '@reduxjs/toolkit';
import { setGenre, setFilms } from './action';
import { FilmInfo } from '../types/films';
import { films } from '../mocks/films';

//type Genre = 'All genres' | 'Comedies' | 'Crime' | 'Documentary' | 'Dramas' | ''

type State = {
  genre: string;
  allFilms: FilmInfo[];
  films: FilmInfo[];
}

const initialState: State = {
  genre: 'All genres',
  allFilms: films,
  films: films,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(setFilms, (state, action) => {
      state.films = action.payload;
    });
});


