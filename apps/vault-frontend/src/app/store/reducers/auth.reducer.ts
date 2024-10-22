import { createReducer, on } from '@ngrx/store';

import { User } from '@vault/shared';
import * as AuthActions from '../actions/auth.actions';

export interface ReducerAuthState {
  isAuthenticated: boolean | null;
  user: User | null;
  errorMessage: string | null;
}

export const initialState: ReducerAuthState = {
  isAuthenticated: null,
  user: null,
  errorMessage: null,
};

export const authReducer = createReducer(
  initialState,
  // On successful authentication, sets the user into redux state and
  // sets the isAuthenticated flag to true
  on(AuthActions.authSuccess, (state, { authBlob }) => ({
    ...state,
    isAuthenticated: true,
    user: authBlob.user,
    errorMessage: null,
  })),

  // On failed authentication, removes the user from redux state and
  // setts the isAuthenticated flag to false
  on(AuthActions.initAuthFailure, (state, { errorMessage }) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    errorMessage,
  })),
  on(AuthActions.loginFailure, (state, { errorMessage }) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    errorMessage,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    errorMessage: null,
  })),
  on(AuthActions.registerFailure, (state, { errorMessage }) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    errorMessage,
  })),
  on(AuthActions.updateUserSuccess, (state, { authBlob: user }) => ({
    ...state,
    user,
    errorMessage: null,
  })),
  on(AuthActions.updateUserFailure, (state, { errorMessage }) => ({
    ...state,
    errorMessage,
  }))
);
