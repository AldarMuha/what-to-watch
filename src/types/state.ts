import store from '../store';
import type { FilmInfo } from './films';
import { AuthorizationStatus } from '../const';
import type { User } from './types';

export type SiteData = {
  films: FilmInfo[];
  filmsByGenre: FilmInfo[];
  filmsShown: FilmInfo[];
  isFilmsStateLoading: boolean;
  film: FilmInfo | null;
  isFilmLoading: boolean;
  comments: Comment[];
  similarFilms: FilmInfo[];
  step: number;
}

export type SiteProcess = {
  genre: string;
}

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: User['email'];
  isUserStatusLoading: boolean;
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
