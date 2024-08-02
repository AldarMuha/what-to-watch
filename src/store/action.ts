import { createAction } from '@reduxjs/toolkit';

export const setGenre = createAction<string>('films/setGanre');
export const getFilmsByType = createAction<string>('films/getFilmsByType');
export const getFilmsShown = createAction<number>('films/getFilmsShown');
export const resetFilms = createAction('films/resetFilms');
