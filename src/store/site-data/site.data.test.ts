import type { FilmInfo } from '../../types/films';
import type { Comment, User } from '../../types/types';
import { fetchComments, fetchFavoriteFilms, fetchFilm, fetchFilms, fetchSimilarFilms, postFavoriteFilms, postReview } from '../action';
import { siteData } from './site-data';

const user: User = {
  avatarUrl: 'img/user-1.jpg',
  email: 'max@gmail.com',
  id: 1,
  name: 'Max',
  token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=',
};
const films: FilmInfo[] = [
  {
    id: 1,
    name: 'Kaligula',
    posterImage: 'img/the-grand-budapest-hotel-poster.jpg',
    previewImage: 'img/the-grand-budapest-hotel.jpg',
    backgroundImage: 'img/the-grand-budapest-hotel-bg.jpg',
    backgroundColor: '#ffffff',
    videoLink: 'https://some-link',
    previewVideoLink: 'https://some-link',
    description: 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustaves friend and protege.',
    rating: 9.0,
    scoresCount: 240,
    director: 'Wes Anderson',
    starring: [
      'Bill Murray'
    ],
    runTime: 99,
    genre: 'Comedy',
    released: 2014,
    isFavorite: false,
  },
  {
    id: 2,
    name: 'Paprica',
    posterImage: 'img/the-grand-budapest-hotel-poster.jpg',
    previewImage: 'img/the-grand-budapest-hotel.jpg',
    backgroundImage: 'img/the-grand-budapest-hotel-bg.jpg',
    backgroundColor: '#ffffff',
    videoLink: 'https://some-link',
    previewVideoLink: 'https://some-link',
    description: 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustaves friend and protege.',
    rating: 5.0,
    scoresCount: 200,
    director: 'Tinto Brass',
    starring: [
      'Bill Murray'
    ],
    runTime: 90,
    genre: 'Erotic',
    released: 1994,
    isFavorite: false,
  }
];

const comments: Comment[] = [
  {
    comment: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the directors funniest and most exquisitely designed movies in years.',
    date: 'Mon Sep 09 2024 23:06:42 GMT+0500 (Екатеринбург, стандартное время)',
    id: 1,
    rating: 8.6,
    user: {
      id: user.id,
      name: user.name,
    }
  }
];

describe('Reducer: siteData', () => {
  it('without additional parameters should return initial state', () => {
    expect(siteData.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
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
      });
  });
  it('should fetch films', () => {
    const state = {
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
    expect(siteData.reducer(state, { type: fetchFilms.pending.type }))
      .toEqual({
        films: [],
        filmsByGenre: [],
        filmsShown: [],
        isFilmsStateLoading: true,
        film: null,
        isFilmLoading: false,
        comments: [],
        similarFilms: [],
        step: 1,
        promoFilm: null,
        favoriteFilms: [],
        isFavoriteLoading: false,
      });
    expect(siteData.reducer(state, { type: fetchFilms.fulfilled.type, payload: films }))
      .toEqual({
        films: films,
        filmsByGenre: films,
        filmsShown: films.slice(0, 8),
        isFilmsStateLoading: false,
        film: null,
        isFilmLoading: false,
        comments: [],
        similarFilms: [],
        step: 1,
        promoFilm: null,
        favoriteFilms: [],
        isFavoriteLoading: false,
      });
    expect(siteData.reducer(state, { type: fetchFilms.rejected.type }))
      .toEqual({
        films: [],
        filmsByGenre: [],
        filmsShown: [],
        isFilmsStateLoading: true,
        film: null,
        isFilmLoading: false,
        comments: [],
        similarFilms: [],
        step: 1,
        promoFilm: null,
        favoriteFilms: [],
        isFavoriteLoading: false,
      });
  });

  it('should fetch film', () => {
    const state = {
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
    expect(siteData.reducer(state, { type: fetchFilm.pending.type }))
      .toEqual({
        films: [],
        filmsByGenre: [],
        filmsShown: [],
        isFilmsStateLoading: false,
        film: null,
        isFilmLoading: true,
        comments: [],
        similarFilms: [],
        step: 1,
        promoFilm: null,
        favoriteFilms: [],
        isFavoriteLoading: false,
      });
    expect(siteData.reducer(state, { type: fetchFilm.fulfilled.type, payload: films[0] }))
      .toEqual({
        films: [],
        filmsByGenre: [],
        filmsShown: [],
        isFilmsStateLoading: false,
        film: films[0],
        isFilmLoading: false,
        comments: [],
        similarFilms: [],
        step: 1,
        promoFilm: null,
        favoriteFilms: [],
        isFavoriteLoading: false,
      });
    expect(siteData.reducer(state, { type: fetchFilm.rejected.type }))
      .toEqual({
        films: [],
        filmsByGenre: [],
        filmsShown: [],
        isFilmsStateLoading: false,
        film: null,
        isFilmLoading: true,
        comments: [],
        similarFilms: [],
        step: 1,
        promoFilm: null,
        favoriteFilms: [],
        isFavoriteLoading: false,
      });
  });

  it('should fetch similar films', () => {
    const state = {
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
    expect(siteData.reducer(state, { type: fetchSimilarFilms.fulfilled.type, payload: films }))
      .toEqual({
        films: [],
        filmsByGenre: [],
        filmsShown: [],
        isFilmsStateLoading: false,
        film: null,
        isFilmLoading: false,
        comments: [],
        similarFilms: films,
        step: 1,
        promoFilm: null,
        favoriteFilms: [],
        isFavoriteLoading: false,
      });
  });

  it('should fetch comments', () => {
    const state = {
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
    expect(siteData.reducer(state, { type: fetchComments.fulfilled.type, payload: comments }))
      .toEqual({
        films: [],
        filmsByGenre: [],
        filmsShown: [],
        isFilmsStateLoading: false,
        film: null,
        isFilmLoading: false,
        comments: comments,
        similarFilms: [],
        step: 1,
        promoFilm: null,
        favoriteFilms: [],
        isFavoriteLoading: false,
      });
  });

  it('should fetch favorite films', () => {
    const state = {
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
    expect(siteData.reducer(state, { type: fetchFavoriteFilms.pending.type }))
      .toEqual({
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
        isFavoriteLoading: true,
      });
    expect(siteData.reducer(state, { type: fetchFavoriteFilms.fulfilled.type, payload: films }))
      .toEqual({
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
        favoriteFilms: films,
        isFavoriteLoading: false,
      });
    expect(siteData.reducer(state, { type: fetchFavoriteFilms.rejected.type }))
      .toEqual({
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
      });
  });

  it('should post comment', () => {
    const state = {
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
    expect(siteData.reducer(state, { type: postReview.fulfilled.type, payload: comments }))
      .toEqual({
        films: [],
        filmsByGenre: [],
        filmsShown: [],
        isFilmsStateLoading: false,
        film: null,
        isFilmLoading: false,
        comments: comments,
        similarFilms: [],
        step: 1,
        promoFilm: null,
        favoriteFilms: [],
        isFavoriteLoading: false,
      });
  });
  it('should post favorite', () => {
    const state = {
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
    expect(siteData.reducer(state, { type: postFavoriteFilms.fulfilled, payload: { ...films[0], isFavorite: true } }))
      .toEqual({
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
        favoriteFilms: [{ ...films[0], isFavorite: true }],
        isFavoriteLoading: false,
      });
    expect(siteData.reducer(state, { type: postFavoriteFilms.fulfilled, payload: { ...films[0], isFavorite: false } }))
      .toEqual({
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
      });
  });
});
