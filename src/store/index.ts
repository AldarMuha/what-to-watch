import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { createApi } from '../services/api';
import { fetchFilms, fetchUserStatus } from './action';
import { history } from '../components/history/history';

const api = createApi();
const store = configureStore({
  reducer,
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

export default store;
