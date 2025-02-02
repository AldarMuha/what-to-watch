import { AuthorizationStatus } from '../../const';
import { fetchUserStatus, loginUser } from '../action';
import { userProcess } from './user-process';

const email = 'abc123@gmail.com';

describe('Reducer: userProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: '',
        isUserStatusLoading: false,
      });
  });

  it('should fetch authorization status', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: '',
      isUserStatusLoading: false,
    };

    expect(userProcess.reducer(state, { type: fetchUserStatus.pending.type }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: '',
        isUserStatusLoading: true,
      });

    expect(userProcess.reducer(state, { type: fetchUserStatus.rejected.type }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: '',
        isUserStatusLoading: false,
      });
    expect(userProcess.reducer(state, { type: fetchUserStatus.fulfilled.type, payload: email }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        user: email,
        isUserStatusLoading: false,
      });
  });

  it('should login user', () => {
    const state = {
      isUserStatusLoading: false,
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: '',
    };
    expect(userProcess.reducer(state, { type: loginUser.fulfilled.type, payload: email }))
      .toEqual({
        isUserStatusLoading: false,
        authorizationStatus: AuthorizationStatus.Auth,
        user: email,
      });
  });
});
