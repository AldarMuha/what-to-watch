import { createSlice } from '@reduxjs/toolkit';
import type { UserProcess } from '../../types/state';
import { fetchUserStatus, loginUser, requireAuthorization } from '../action';
import { StoreSlice, AuthorizationStatus } from '../../const';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  user: '',
  isUserStatusLoading: false,
};

export const userProcess = createSlice({
  name: StoreSlice.UserProcess,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserStatus.pending, (state) => {
        state.isUserStatusLoading = true;
      })
      .addCase(fetchUserStatus.fulfilled, (state, action) => {
        state.isUserStatusLoading = false;
        state.user = action.payload.email;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(fetchUserStatus.rejected, (state) => {
        //state.isFilmsStateLoading = true;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(requireAuthorization, (state, action) => {
        state.authorizationStatus = action.payload;
      });
  },
});
