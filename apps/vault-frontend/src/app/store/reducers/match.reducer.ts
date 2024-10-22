import { createReducer, on } from "@ngrx/store";

import { Match } from "@vault/shared";
import * as MatchActions from '../actions/match.actions';

export interface ReducerMatchState {
  current: Match | null;
  errorMessage: string | null;
}

export const initialState: ReducerMatchState = {
  current: null,
  errorMessage: null,
};

export const matchReducer = createReducer(
  initialState,
  on(MatchActions.initCurrentSuccess, (state, { currentMatch: current }) => ({
    ...state,
    current,
    errorMessage: null,
  })),
  on(MatchActions.initCurrentFailure, (state, { errorMessage }) => ({
    ...state,
    current: null,
    errorMessage,
  })),
  on(MatchActions.reportResultSuccess, (state, { game: current }) => ({
    ...state,
    current,
    errorMessage: null,
  })),
);
