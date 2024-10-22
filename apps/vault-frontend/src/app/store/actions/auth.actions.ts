import { createAction, props } from '@ngrx/store';

import { AuthInterface, AuthPayload, User } from '@vault/shared';

const TYPE = '[Auth]';

export enum AuthActionTypes {
  AUTH_SUCCESS = `${TYPE} Auth Success`,
  INIT_AUTH = `${TYPE} Initialize Auth`,
  INIT_AUTH_FAILURE = `${TYPE} Initialize Auth Failure`,
  LOGIN = `${TYPE} Login`,
  LOGIN_FAILURE = `${TYPE} Login Failure`,
  LOGOUT = `${TYPE} Logout`,
  REGISTER = `${TYPE} Register`,
  REGISTER_FAILURE = `${TYPE} Register Failure`,
  UPDATE_USER = `${TYPE} Update User`,
  UPDATE_USER_SUCCESS = `${TYPE} Update User Success`,
  UPDATE_USER_FAILURE = `${TYPE} Update User Failure`,
}

// checks if valid authentication exists for the current user
// and either returns an initAuthSuccess or initAuthFailure
export const initAuth = createAction(AuthActionTypes.INIT_AUTH);

// Stores auth data in redux state and local storage and returns
// to returnUrl, if given
export const authSuccess = createAction(
  AuthActionTypes.AUTH_SUCCESS,
  props<{ authBlob: AuthInterface; returnUrl?: string }>()
);

// Stores an error message in state and resets authentication because
// no valid authentication was found
export const initAuthFailure = createAction(
  AuthActionTypes.INIT_AUTH_FAILURE,
  props<{ errorMessage: string }>()
);

// Tries to authenticate to the backend using loginData and,
// if successful, returns to returnUrl after
export const login = createAction(
  AuthActionTypes.LOGIN,
  props<{ loginData: AuthPayload, returnUrl: string }>()
);

// Stores an error message in state and resets authentication because
// the login attempt failed
export const loginFailure = createAction(
  AuthActionTypes.LOGIN_FAILURE,
  props<{ errorMessage: string }>()
);

// Removes auth data from cache and from local storage
export const logout = createAction(AuthActionTypes.LOGOUT);

// Tries to register a new user to the backend using registerData.
export const register = createAction(
  AuthActionTypes.REGISTER,
  props<{ registerData: AuthPayload }>()
);

// Stores an error message in state and resets authentication because
// the registration attempt failed
export const registerFailure = createAction(
  AuthActionTypes.REGISTER_FAILURE,
  props<{ errorMessage: string }>()
);

// Attempts a PATCH request to the API to update the currently logged in user.
export const updateUser = createAction(
  AuthActionTypes.UPDATE_USER,
  props<{ email: string; username: string; userId: number }>()
);

// Returns authentication data for the now changed user to ensure validity
// among API, cache and local storage.
export const updateUserSuccess = createAction(
  AuthActionTypes.UPDATE_USER_SUCCESS,
  props<{ authBlob: User }>()
);

// Stores an error message in state and resets authentication because
// the user update attempt failed
export const updateUserFailure = createAction(
  AuthActionTypes.UPDATE_USER_FAILURE,
  props<{ errorMessage: string }>()
);
