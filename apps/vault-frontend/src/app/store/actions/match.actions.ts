import { EntityMap, EntityMapOne, Predicate, Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { Match, Result } from '@vault/shared';

const TYPE = '[Match/API]';

export enum MatchActionTypes {
  MATCH_STORE_FAILURE = `${TYPE} Error`,
  INITIALIZE_MATCHES = `${TYPE} Initialize matches`,
  SET_CURRENT_MATCH_SELECTED = `${TYPE} Set current match selected`,
  SELECT_MATCH = `${TYPE} Select match`,
  LOAD_MATCHES = `${TYPE} Load matches`,
  SET_MATCHES = `${TYPE} Set matches`,
  ADD_MATCH = `${TYPE} Add match`,
  SET_MATCH = `${TYPE} Set match`,
  UPSERT_MATCH = `${TYPE} Upsert Match`,
  ADD_MATCHES = `${TYPE} Add Matches`,
  UPSERT_MATCHES = `${TYPE} Upsert Matches`,
  UPDATE_MATCH = `${TYPE} Update Match`,
  UPDATE_MATCHES = `${TYPE} Update Matches`,
  MAP_MATCH = `${TYPE} Map Match`,
  MAP_MATCHES = `${TYPE} Map Matches`,
  DELETE_MATCH = `${TYPE} Delete Match`,
  DELETE_MATCHES = `${TYPE} Delete Matches`,
  DELETE_MATCHES_BY_PREDICATE = `${TYPE} Delete Matches By Predicate`,
  CLEAR_MATCHES = `${TYPE} Clear Matches`,
  REPORT_RESULT = `${TYPE} Report result`,
  CONFIRM_RESULT = `${TYPE} Confirm result`,
  CONFIRM_RESULT_SUCCESS = `${TYPE} Confirm result success`,
}

export const matchStoreFailure = createAction(
  MatchActionTypes.MATCH_STORE_FAILURE,
  props<{ errorMessage: string }>()
);
export const initializeMatches = createAction(
  MatchActionTypes.INITIALIZE_MATCHES,
  props<{ draftId: number }>()
);
export const setCurrentMatchSelected = createAction(
  MatchActionTypes.SET_CURRENT_MATCH_SELECTED,
  props<{ query: (game: Match) => boolean }>()
);
export const selectMatch = createAction(
  MatchActionTypes.SELECT_MATCH,
  props<{ matchId: number }>()
);
export const loadMatches = createAction(
  MatchActionTypes.LOAD_MATCHES,
  props<{ matches: Match[] }>()
);
export const setMatches = createAction(
  MatchActionTypes.SET_MATCHES,
  props<{ matches: Match[] }>()
);
export const addMatch = createAction(
  MatchActionTypes.ADD_MATCH,
  props<{ game: Match }>()
);
export const setMatch = createAction(
  MatchActionTypes.SET_MATCH,
  props<{ game: Match }>()
);
export const upsertMatch = createAction(
  MatchActionTypes.UPSERT_MATCH,
  props<{ game: Match }>()
);
export const addMatches = createAction(
  MatchActionTypes.ADD_MATCHES,
  props<{ matches: Match[] }>()
);
export const upsertMatches = createAction(
  MatchActionTypes.UPSERT_MATCHES,
  props<{ matches: Match[] }>()
);
export const updateMatch = createAction(
  MatchActionTypes.UPDATE_MATCH,
  props<{ update: Update<Match> }>()
);
export const updateMatches = createAction(
  MatchActionTypes.UPDATE_MATCHES,
  props<{ updates: Update<Match>[] }>()
);
export const mapMatch = createAction(
  MatchActionTypes.MAP_MATCH,
  props<{ entityMap: EntityMapOne<Match> }>()
);
export const mapMatches = createAction(
  MatchActionTypes.MAP_MATCHES,
  props<{ entityMap: EntityMap<Match> }>()
);
export const deleteMatch = createAction(
  MatchActionTypes.DELETE_MATCH,
  props<{ id: number }>()
);
export const deleteMatches = createAction(
  MatchActionTypes.DELETE_MATCHES,
  props<{ ids: number[] }>()
);
export const deleteMatchesByPredicate = createAction(
  MatchActionTypes.DELETE_MATCHES_BY_PREDICATE,
  props<{ predicate: Predicate<Match> }>()
);
export const clearMatches = createAction(MatchActionTypes.CLEAR_MATCHES);

// Reports a result and stores the updated game in state
export const reportResult = createAction(
  MatchActionTypes.REPORT_RESULT,
  props<{ matchId: number; result: Result }>()
);
// Confirms a result and stores the updated game in state
export const confirmResult = createAction(
  MatchActionTypes.CONFIRM_RESULT,
  props<{ matchId: number }>()
);
