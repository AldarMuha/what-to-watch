import { createAction } from '@reduxjs/toolkit';
import { FilmInfo } from '../types/films';

export const setGenre = createAction<string>('films/setGanre');
export const setFilms = createAction<FilmInfo[]>('films/set');
