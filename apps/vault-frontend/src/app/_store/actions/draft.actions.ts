import { createAction, props } from '@ngrx/store';

import { Draft } from '@vault/shared';

const TYPE = '[Drafts]';

export enum DraftActionTypes {
  DRAFT_STORE_FAILURE = `${TYPE} Error`,
  INIT_ONGOING_DRAFTS = `${TYPE} Initialize all drafts`,
  INIT_ONGOING_DRAFTS_SUCCESS = `${TYPE} Initialize all drafts success`,
  INIT_CURRENT_DRAFT = `${TYPE} Initialize current draft`,
  INIT_CURRENT_DRAFT_SUCCESS = `${TYPE} Initialize current draft success`,
}

export const draftStoreFailure = createAction(
  DraftActionTypes.DRAFT_STORE_FAILURE,
  props<{ errorMessage: string }>()
);

export const initOngoingDrafts = createAction(
  DraftActionTypes.INIT_ONGOING_DRAFTS,
  props<{ tournamentId: number }>()
);

export const initOngoingDraftsSuccess = createAction(
  DraftActionTypes.INIT_ONGOING_DRAFTS_SUCCESS,
  props<{ ongoing: Draft[] }>()
);

export const initCurrentDraft = createAction(
  DraftActionTypes.INIT_CURRENT_DRAFT,
  props<{ tournamentId: number }>()
);

export const initCurrentDraftSuccess = createAction(
  DraftActionTypes.INIT_CURRENT_DRAFT_SUCCESS,
  props<{ current: Draft }>()
);
