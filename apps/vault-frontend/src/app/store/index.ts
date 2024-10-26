import { createSelector } from '@ngrx/store';

import { Role } from '@vault/shared';
import { AuthState } from './reducers/auth.reducer';
import { TournamentState } from './reducers/tournaments.reducer';
import { DraftState } from './reducers/draft.reducer';
import { MatchState } from './reducers/match.reducer';
import { EnrollmentState } from './reducers/enrollment.reducer';

// AUTH
export interface AuthAppState {
  auth: AuthState;
}
export const selectAuth = (state: AuthAppState) => state.auth;
export const selectAuthUser = createSelector(
  selectAuth,
  (state: AuthState) => state.user
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

// MATCHES
export interface MatchAppState {
  match: MatchState;
}
export const selectMatch = (state: MatchAppState) => state.match;
export const selectCurrentMatch = createSelector(
  selectMatch,
  (state: MatchState) => state.current
);
export const selectCurrentMatchId = createSelector(
  selectMatch,
  (state: MatchState) => state.current!.game.id
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
