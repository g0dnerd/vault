import { createAction, props } from '@ngrx/store';

import { Match, Result } from '@vault/shared';

const TYPE = '[Matches]';

export enum MatchActionTypes {
  INIT_CURRENT = `${TYPE} Initialize current match`,
  INIT_CURRENT_SUCCESS = `${TYPE} Initialize current match success`,
  INIT_CURRENT_FAILURE = `${TYPE} Initialize current match failure`,
  REPORT_RESULT = `${TYPE} Report result`,
  REPORT_RESULT_SUCCESS = `${TYPE} Report result success`,
  CONFIRM_RESULT = `${TYPE} Confirm result`,
  CONFIRM_RESULT_SUCCESS = `${TYPE} Confirm result success`,
}

// Gets the current match for the current user
// for the given `tournamentId` and stores it in state.
export const initCurrent = createAction(
  MatchActionTypes.INIT_CURRENT,
  props<{ tournamentId: number }>()
);
export const initCurrentSuccess = createAction(
  MatchActionTypes.INIT_CURRENT_SUCCESS,
  props<{ current: Match }>()
);
export const initCurrentFailure = createAction(
  MatchActionTypes.INIT_CURRENT_FAILURE,
  props<{ errorMessage: string }>()
);

// Reports a result and stores the updated game in state
export const reportResult = createAction(
  MatchActionTypes.REPORT_RESULT,
  props<{ result: Result }>()
);
export const reportResultSuccess = createAction(
  MatchActionTypes.REPORT_RESULT_SUCCESS,
  props<{ game: Match }>()
);

// Confirms a result and stores the updated game in state
export const confirmResult = createAction(
  MatchActionTypes.CONFIRM_RESULT,
  props<{ matchId: number }>()
);
