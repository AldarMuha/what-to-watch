import type { State } from '../../types/state';
import type { FilmInfo } from '../../types/films';
import type { Comment } from '../../types/types';
import { StoreSlice } from '../../const';

export const getIsFilmsLoading = ({ [StoreSlice.SiteData]: SITE_DATA }: State): boolean =>
  SITE_DATA.isFilmsStateLoading;
export const getFilms = ({ [StoreSlice.SiteData]: SITE_DATA }: State): FilmInfo[] => SITE_DATA.films;
export const getFilmsByGenre = ({ [StoreSlice.SiteData]: SITE_DATA }: State): FilmInfo[] => SITE_DATA.filmsByGenre;
export const getFilmsShown = ({ [StoreSlice.SiteData]: SITE_DATA }: State): FilmInfo[] => SITE_DATA.filmsShown;

export const getIsFilmLoading = ({ [StoreSlice.SiteData]: SITE_DATA }: State): boolean =>
  SITE_DATA.isFilmLoading;
export const getFilm = ({ [StoreSlice.SiteData]: SITE_DATA }: State): FilmInfo | null => SITE_DATA.film;

export const getSimilarFilms = ({ [StoreSlice.SiteData]: SITE_DATA }): FilmInfo[] => SITE_DATA.similarFilms;
export const getComments = ({ [StoreSlice.SiteData]: SITE_DATA }): Comment[] => SITE_DATA.comments;
