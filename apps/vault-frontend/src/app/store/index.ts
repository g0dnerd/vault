import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import { Match, Role } from '@vault/shared';
import { AuthState } from './reducers/auth.reducer';
import { TournamentState } from './reducers/tournaments.reducer';
import { DraftState } from './reducers/draft.reducer';
import { EnrollmentState } from './reducers/enrollment.reducer';

import * as fromMatch from './reducers/match.reducer';

export interface State {
  matches: fromMatch.MatchState;
}

export const reducers: ActionReducerMap<State> = {
  matches: fromMatch.matchReducer,
};

// MATCHES
export const selectMatchState =
  createFeatureSelector<fromMatch.MatchState>('matches');
export const selectMatchIds = createSelector(
  selectMatchState,
  fromMatch.selectMatchIds
);
export const selectMatchEntities = createSelector(
  selectMatchState,
  fromMatch.selectMatchEntities
);
export const selectAllMatches = createSelector(
  selectMatchState,
  fromMatch.selectAllMatches
);
export const selectMatchTotal = createSelector(
  selectMatchState,
  fromMatch.selectMatchTotal
);
export const selectMatchById = (matchId: number) =>
  createSelector(
    selectMatchState,
    (matchState) => matchState.entities[matchId]
  );
export const selectMatchByQuery = (query: (game: Match) => boolean) =>
  createSelector(selectMatchState, (state) => {
    return Object.values(state.entities).find(
      (game): game is Match => !!game && query(game)
    );
  });

// AUTH
export interface AuthAppState {
  auth: AuthState;
}
export const selectAuth = (state: AuthAppState) => state.auth;
export const selectAuthUser = createSelector(
  selectAuth,
  (state: AuthState) => state.user
);
export const selectUserId = createSelector(selectAuthUser, (user) =>
  user ? user.id : null
);
export const selectAuthStatus = createSelector(
  selectAuth,
  (state: AuthState) => state.isAuthenticated
);
export const selectAuthToken = createSelector(
  selectAuth,
  (state: AuthState) => state.token
);
export const selectAdminStatus = createSelector(
  selectAuth,
  (state: AuthState) => state.user?.roles?.includes(Role.Admin)
);
export const selectErrorMessage = createSelector(
  selectAuth,
  (state: AuthState) => state.errorMessage
);

// TOURNAMENTS
export interface TournamentAppState {
  tournaments: TournamentState;
}
export const selectTournaments = (state: TournamentAppState) =>
  state.tournaments;
export const selectAllTournaments = createSelector(
  selectTournaments,
  (state: TournamentState) => state.all
);
export const selectAvailableTournaments = createSelector(
  selectTournaments,
  (state: TournamentState) => state.available
);
export const selectEnrolledTournaments = createSelector(
  selectTournaments,
  (state: TournamentState) => state.enrolled
);
export const selectSelectedTournament = createSelector(
  selectTournaments,
  (state: TournamentState) => state.selected
);

// DRAFTS
export interface DraftAppState {
  drafts: DraftState;
}
export const selectDrafts = (state: DraftAppState) => state.drafts;
export const selectOngoingDraft = createSelector(
  selectDrafts,
  (state: DraftState) => state.ongoing
);
export const selectCurrentDraft = createSelector(
  selectDrafts,
  (state: DraftState) => state.current
);
export const selectSelectedDraft = createSelector(
  selectDrafts,
  (state: DraftState) => state.selected
);

// ENROLLMENTS
export interface EnrollmentAppState {
  enrollment: EnrollmentState;
}
export const selectEnrollment = (state: EnrollmentAppState) => state.enrollment;
export const selectCurrentEnrollment = createSelector(
  selectEnrollment,
  (state: EnrollmentState) => state.current
);
