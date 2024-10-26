import { createReducer, on } from '@ngrx/store';

import { Match } from '@vault/shared';
import * as MatchActions from '../actions/match.actions';

export interface MatchState {
  current: Match | null;
  ongoing: Match[];
  errorMessage: string | null;
}

export const initialState: MatchState = {
  current: null,
  ongoing: [],
  errorMessage: null,
};

export const matchReducer = createReducer(
  initialState,
  on(MatchActions.initCurrentSuccess, (state, { current }) => ({
    ...state,
    current,
    errorMessage: null,
  })),
  on(MatchActions.initCurrentFailure, (state, { errorMessage }) => ({
    ...state,
    current: null,
    errorMessage,
  })),
  // NOTE: this would not work great for multiple ongoing drafts,
  // because matches would keep overwriting each other in state.
  on(MatchActions.initForDraftSuccess, (state, { ongoing }) => ({
    ...state,
    ongoing,
  })),
  on(MatchActions.initForDraftFailure, (state, { errorMessage }) => ({
    ...state,
    ongoing: [],
    errorMessage,
  })),
  on(MatchActions.reportResultSuccess, (state, { current }) => ({
    ...state,
    current,
    errorMessage: null,
  }))
);
