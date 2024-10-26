import { createReducer, on } from '@ngrx/store';

import { Enrollment } from '@vault/shared';
import * as EnrollmentActions from '../actions/enrollment.actions';

export interface EnrollmentState {
  current: Enrollment | null;
  errorMessage: string | null;
}

export const initialState: EnrollmentState = {
  current: null,
  errorMessage: null,
};

export const enrollmentReducer = createReducer(
  initialState,
  on(EnrollmentActions.getByTournamentIdSuccess, (state, { current }) => ({
    ...state,
    current,
    errorMessage: null,
  })),
  on(EnrollmentActions.getByTournamentIdFailure, (state, { errorMessage }) => ({
    ...state,
    current: null,
    errorMessage,
  }))
);
