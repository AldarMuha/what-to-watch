import { configureStore } from '@reduxjs/toolkit';
import { rootReduser } from './root-reduser';
import { createApi } from '../services/api';
import { fetchFilms, fetchUserStatus, fetchPromoFilm, fetchFavoriteFilms } from './action';
import history from '../services/history';

const api = createApi();
const store = configureStore({
  reducer: rootReduser,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api,
          history
        }
      },
    }),
});

store.dispatch(fetchUserStatus());
store.dispatch(fetchFilms());
store.dispatch(fetchPromoFilm());
store.dispatch(fetchFavoriteFilms());

export default store;
