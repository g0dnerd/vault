import { createAction, props } from '@ngrx/store';

import { Draft, DraftStandings } from '@vault/shared';

const TYPE = '[Drafts]';

export enum DraftActionTypes {
  INIT_ONGOING = `${TYPE} Initialize all drafts`,
  INIT_ONGOING_SUCCESS = `${TYPE} Initialize all drafts success`,
  INIT_ONGOING_FAILURE = `${TYPE} Initialize all drafts failure`,
  INIT_CURRENT = `${TYPE} Initialize current draft`,
  INIT_CURRENT_SUCCESS = `${TYPE} Initialize current draft success`,
  INIT_CURRENT_FAILURE = `${TYPE} Initialize current draft failure`,
  SELECT_DRAFT = `${TYPE} Select draft`,
  SELECT_DRAFT_SUCCESS = `${TYPE} Select draft success`,
  SELECT_DRAFT_FAILURE = `${TYPE} Select draft failure`,
  MAKE_DRAFT_STANDINGS = `${TYPE} Make draft standings`,
  MAKE_DRAFT_STANDINGS_SUCCESS = `${TYPE} Make draft standings success`,
  MAKE_DRAFT_STANDINGS_FAILURE = `${TYPE} Make draft standings failure`,
}

export const initOngoing = createAction(
  DraftActionTypes.INIT_ONGOING,
  props<{ id: number }>()
);

export const initOngoingSuccess = createAction(
  DraftActionTypes.INIT_ONGOING_SUCCESS,
  props<{ allDrafts: Draft[] }>()
);

export const initOngoingFailure = createAction(
  DraftActionTypes.INIT_ONGOING_FAILURE,
  props<{ errorMessage: string }>()
);

export const initCurrent = createAction(
  DraftActionTypes.INIT_CURRENT,
  props<{ tournamentId: number }>()
);

export const initCurrentSuccess = createAction(
  DraftActionTypes.INIT_CURRENT_SUCCESS,
  props<{ currentDraft: Draft }>()
);

export const initCurrentFailure = createAction(
  DraftActionTypes.INIT_CURRENT_FAILURE,
  props<{ errorMessage: string }>()
);

export const selectDraft = createAction(
  DraftActionTypes.SELECT_DRAFT,
  props<{ id: number }>()
);

export const selectDraftSuccess = createAction(
  DraftActionTypes.SELECT_DRAFT_SUCCESS,
  props<{ draft: Draft }>()
);

export const selectDraftFailure = createAction(
  DraftActionTypes.SELECT_DRAFT_FAILURE,
  props<{ errorMessage: string }>()
);

export const makeDraftStandings = createAction(
  DraftActionTypes.MAKE_DRAFT_STANDINGS,
  props<{ draftId: number; round: number }>()
);

export const makeDraftStandingsSuccess = createAction(
  DraftActionTypes.MAKE_DRAFT_STANDINGS_SUCCESS,
  props<{ standings: DraftStandings }>()
);

export const makeDraftStandingsFailure = createAction(
  DraftActionTypes.MAKE_DRAFT_STANDINGS_FAILURE,
  props<{ errorMessage: string }>()
);
