import type { Action } from '@reduxjs/toolkit';
import type { State } from '../types/state';
import type { History } from 'history';
import type { AxiosInstance } from 'axios';

import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { createApi } from '../services/api';
import { AppRoute } from '../const';
import { fetchUserStatus } from './action';
import exp from 'constants';

describe('Async actions', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument({ api })];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, { api: AxiosInstance, history: History }, Action>
  >(middlewares);

  it('fetchUserStatus should be fullfilled when server returns 200', async () => {
    const store = mockStore();
    mockApi
      .onGet(AppRoute.Login)
      .reply(200, {});
    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchUserStatus());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchUserStatus.pending.type,
      fetchUserStatus.fulfilled.type
    ]);
  });
  it('fetchUserStatus should be rejected when server returns 401', async () => {
    const store = mockStore();
    mockApi
      .onGet(AppRoute.Login)
      .reply(401, {});
    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchUserStatus());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchUserStatus.pending.type,
      fetchUserStatus.rejected.type,
    ]);
  });
});

