import { createReducer, on } from '@ngrx/store';

import { Tournament } from '@vault/shared';
import * as TournamentActions from '../actions/tournaments.actions';

export interface ReducerTournamentsState {
  all: Tournament[];
  available: Tournament[];
  enrolled: Tournament[];
  selected: Tournament | null;
  errorMessage: string | null;
}

export const initialState: ReducerTournamentsState = {
  all: [],
  available: [],
  enrolled: [],
  selected: null,
  errorMessage: null,
};

export const tournamentsReducer = createReducer(
  initialState,
  on(TournamentActions.initAllSuccess, (state, { allTournaments: all }) => ({
    ...state,
    all,
    errorMessage: null,
  })),
  on(TournamentActions.initAllFailure, (state, { errorMessage }) => ({
    ...state,
    all: [],
    errorMessage,
  })),
  on(TournamentActions.initAvailableSuccess, (state, { availableTournaments: available }) => ({
    ...state,
    available,
    errorMessage: null,
  })),
  on(
    TournamentActions.initAvailableFailure,
    (state, { errorMessage }) => ({
      ...state,
      available: [],
      errorMessage,
    })
  ),
  on(TournamentActions.initEnrolledSuccess, (state, { enrolledTournaments: enrolled }) => ({
    ...state,
    enrolled,
    errorMessage: null,
  })),
  on(
    TournamentActions.initEnrolledFailure,
    (state, { errorMessage }) => ({
      ...state,
      enrolled: [],
      errorMessage,
    })
  ),
  on(TournamentActions.registerSuccess, (state, { tournament }) => ({
    ...state,
    enrolled: [...state.enrolled, tournament],
    errorMessage: null,
  })),
  on(TournamentActions.registerFailure, (state, { errorMessage }) => ({
    ...state,
    errorMessage,
  })),
  on(TournamentActions.selectTournamentSuccess, (state, { tournament: selected }) => ({
    ...state,
    selected,
  })),
  on(TournamentActions.selectTournamentFailure, (state, { errorMessage }) => ({
    ...state,
    selected: null,
    errorMessage,
  })),
);
