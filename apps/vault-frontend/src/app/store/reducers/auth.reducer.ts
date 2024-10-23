import { createReducer, on } from '@ngrx/store';

import { User } from '@vault/shared';
import * as AuthActions from '../actions/auth.actions';

export interface AuthState {
  isAuthenticated: boolean | null;
  user: User | null;
  errorMessage: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: null,
  user: null,
  errorMessage: null,
};

export const authReducer = createReducer(
  initialState,
  // On successful authentication, sets the user into state and
  // sets the isAuthenticated flag to true
  on(AuthActions.authSuccess, (state, { authBlob }) => ({
    ...state,
    isAuthenticated: true,
    user: authBlob.user,
    errorMessage: null,
  })),

  // On failed authentication, removes the user from state and
  // setts the isAuthenticated flag to false
  on(AuthActions.initAuthFailure, (state, { errorMessage }) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    errorMessage,
  })),

  // On failed login, removes authentication and user from state
  on(AuthActions.loginFailure, (state, { errorMessage }) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    errorMessage,
  })),

  // On logout, removes authentication and user from state
  on(AuthActions.logout, (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    errorMessage: null,
  })),

  // On failed register, removes authentication and user from state
  on(AuthActions.registerFailure, (state, { errorMessage }) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    errorMessage,
  })),

  // On successful user update, set the new user object into state
  on(AuthActions.updateUserSuccess, (state, { authBlob: user }) => ({
    ...state,
    user,
    errorMessage: null,
  })),

  // On failed user update, removes authentication and user from state
  on(AuthActions.updateUserFailure, (state, { errorMessage }) => ({
    ...state,
    errorMessage,
  }))
);
