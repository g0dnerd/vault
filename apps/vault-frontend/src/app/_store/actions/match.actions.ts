import { createAction, props } from '@ngrx/store';

import { Match } from '@vault/shared';

const TYPE = '[Match/API]';

export enum MatchActionTypes {
  MATCH_STORE_FAILURE = `${TYPE} Error`,
  INIT_CURRENT_MATCH = `${TYPE} Initialize current match`,
  INIT_CURRENT_MATCH_SUCCESS = `${TYPE} Initialize current match success`,
  UPDATE_CURRENT_MATCH = `${TYPE} Update current match`,
}

export const matchStoreFailure = createAction(
  MatchActionTypes.MATCH_STORE_FAILURE,
  props<{ errorMessage: string }>()
);
export const initCurrentMatch = createAction(
  MatchActionTypes.INIT_CURRENT_MATCH,
  props<{ draftId: number }>()
);
export const initCurrentMatchSuccess = createAction(
  MatchActionTypes.INIT_CURRENT_MATCH_SUCCESS,
  props<{ current: Match }>()
);
export const updateCurrentMatch = createAction(
  MatchActionTypes.INIT_CURRENT_MATCH,
  props<{ changes: Match }>()
);
