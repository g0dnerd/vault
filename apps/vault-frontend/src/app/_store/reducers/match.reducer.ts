import { createReducer, on } from '@ngrx/store';

import { Match } from '@vault/shared';
import * as MatchActions from '../actions/match.actions';

export interface MatchState {
  current: Match | null;
}

export const initialState: MatchState = {
  current: null,
};

export const matchReducer = createReducer(
  initialState,
  on(MatchActions.matchStoreFailure, (_state, { errorMessage }) => ({
    current: null,
    errorMessage,
  })),
  on(MatchActions.initCurrentMatchSuccess, (_state, { current }) => ({
    current,
    errorMessage: null,
  }))
);
