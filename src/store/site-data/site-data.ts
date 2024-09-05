import { createSlice } from '@reduxjs/toolkit';
import { SiteData } from '../../types/state';
import { StoreSlice } from '../../const';
import { fetchFilms, setFilmsByGenre, showMoreFilms, fetchFilm, fetchComments, fetchSimilarFilms, postReview, fetchPromoFilm, fetchFavoriteFilms, postFavoriteFilms } from '../action';

const initialState: SiteData = {
  films: [],
  filmsByGenre: [],
  filmsShown: [],
  isFilmsStateLoading: false,
  film: null,
  isFilmLoading: false,
  comments: [],
  similarFilms: [],
  step: 1,
  promoFilm: null,
  favoriteFilms: [],
  isFavoriteLoading: false,
};

export const siteData = createSlice({
  name: StoreSlice.SiteData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilms.pending, (state) => {
        state.isFilmsStateLoading = true;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.films = action.payload;
        state.filmsByGenre = state.films;
        state.filmsShown = state.films.slice(0, 8);
        state.isFilmsStateLoading = false;
      })
      .addCase(fetchFilms.rejected, (state) => {
        state.isFilmsStateLoading = true;
      })
      .addCase(setFilmsByGenre, (state, action) => {
        state.filmsByGenre = state.films.filter((filmItem) =>
          (action.payload !== 'All genres') ? filmItem.genre === action.payload : true);
        state.filmsShown = state.filmsByGenre.slice(0, 8);
        state.step = 1;
      })
      .addCase(showMoreFilms, (state) => {
        state.step++;
        state.filmsShown = state.filmsByGenre.slice(0, 8 * state.step);
      })
      .addCase(fetchFilm.pending, (state) => {
        state.isFilmLoading = true;
      })
      .addCase(fetchFilm.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isFilmLoading = false;
      })
      .addCase(fetchFilm.rejected, (state) => {
        state.isFilmLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchSimilarFilms.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchPromoFilm.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
      })
      .addCase(fetchFavoriteFilms.pending, (state) => {
        state.isFavoriteLoading = true;
      })
      .addCase(fetchFavoriteFilms.fulfilled, (state, action) => {
        state.isFavoriteLoading = false;
        state.favoriteFilms = action.payload;
      })
      .addCase(fetchFavoriteFilms.rejected, (state) => {
        state.isFavoriteLoading = false;
      })
      .addCase(postFavoriteFilms.fulfilled, (state, action) => {
        const updatedFilm = action.payload;
        state.films = state.films.map((film) => film.id === updatedFilm.id ? updatedFilm : film);
        if (state.film && state.film.id === updatedFilm.id) {
          state.film = updatedFilm;
        }
        if (updatedFilm.isFavorite) {
          state.favoriteFilms = state.favoriteFilms.concat(updatedFilm);
        } else {
          state.favoriteFilms = state.favoriteFilms.filter((favoriteFilm) => favoriteFilm.id !== updatedFilm.id);
        }
      });
  },
});
