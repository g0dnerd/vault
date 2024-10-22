import { createReducer, on } from '@ngrx/store';

import { Draft } from '@vault/shared';
import * as DraftActions from '../actions/draft.actions';

export interface ReducerDraftState {
  ongoing: Draft[];
  current: Draft | null;
  selected: Draft | null;
  errorMessage: string | null;
}

export const initialState: ReducerDraftState = {
  ongoing: [],
  current: null,
  selected: null,
  errorMessage: null,
};

export const draftReducer = createReducer(
  initialState,
  on(DraftActions.initOngoingSuccess, (state, { allDrafts: ongoing }) => ({
    ...state,
    ongoing,
    errorMessage: null,
  })),
  on(DraftActions.initOngoingFailure, (state, { errorMessage }) => ({
    ...state,
    ongoing: [],
    errorMessage,
  })),
  on(DraftActions.initCurrentSuccess, (state, { currentDraft: current }) => ({
    ...state,
    current,
    errorMessage: null,
  })),
  on(DraftActions.initCurrentFailure, (state, { errorMessage }) => ({
    ...state,
    current: null,
    errorMessage,
  })),
  on(DraftActions.selectDraftSuccess, (state, { draft: selected }) => ({
    ...state,
    selected,
  })),
  on(DraftActions.selectDraftFailure, (state, { errorMessage }) => ({
    ...state,
    selected: null,
    errorMessage,
  })),
);

