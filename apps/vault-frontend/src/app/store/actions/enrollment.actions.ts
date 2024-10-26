import { createAction, props } from '@ngrx/store';

import { Enrollment } from '@vault/shared';

const TYPE = '[Enrollments]';

export enum EnrollmentActionTypes {
  GET_BY_TOURNAMENT_ID = `${TYPE} Get enrollment for current user by tournament ID`,
  GET_BY_TOURNAMENT_ID_SUCCESS = `${TYPE} Get enrollment for current user by tournament ID success`,
  GET_BY_TOURNAMENT_ID_FAILURE = `${TYPE} Get enrollment for current user by tournament ID failure`,
}

export const getByTournamentId = createAction(
  EnrollmentActionTypes.GET_BY_TOURNAMENT_ID,
  props<{ userId: number; tournamentId: number }>()
);

export const getByTournamentIdSuccess = createAction(
  EnrollmentActionTypes.GET_BY_TOURNAMENT_ID_SUCCESS,
  props<{ current: Enrollment }>()
);

export const getByTournamentIdFailure = createAction(
  EnrollmentActionTypes.GET_BY_TOURNAMENT_ID_FAILURE,
  props<{ errorMessage: string }>()
);
