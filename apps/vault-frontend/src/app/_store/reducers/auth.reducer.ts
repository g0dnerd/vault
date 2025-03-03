import { createReducer, on } from '@ngrx/store';

import * as AuthActions from '../actions/auth.actions';
import { User } from '@vault/shared';

export interface AuthState {
  token: string | null;
  isAdmin: boolean;
  profileData: User | null;
  errorMessage: string | null;
}

export const initialState: AuthState = {
  token: null,
  isAdmin: false,
  profileData: null,
  errorMessage: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.authSuccess, (state, { token, isAdmin }) => ({
    ...state,
    token,
    isAdmin,
    errorMessage: null,
  })),
  on(AuthActions.loginFailure, (_state, { errorMessage }) => ({
    isAdmin: false,
    profileData: null,
    token: null,
    errorMessage,
  })),
  // On logout, clears state
  on(AuthActions.logout, (_state) => ({
    token: null,
    isAdmin: false,
    profileData: null,
    errorMessage: null,
  })),
  // On failed registration, removes authentication and user from state
  on(AuthActions.registerFailure, (_state, { errorMessage }) => ({
    isAdmin: false,
    profileData: null,
    token: null,
    errorMessage,
  })),
  on(AuthActions.initProfileSuccess, (state, { user }) => ({
    ...state,
    profileData: user,
    errorMessage: null,
  })),
  on(AuthActions.initProfileFailure, (state, { errorMessage }) => ({
    ...state,
    profileData: null,
    errorMessage,
  })),
  on(AuthActions.initAdminStatusSuccess, (state, { isAdmin }) => ({
    ...state,
    isAdmin,
    errorMessage: null,
  })),
  on(AuthActions.initAdminStatusFailure, (state, { errorMessage }) => ({
    ...state,
    isAdmin: false,
    errorMessage,
  }))
);
