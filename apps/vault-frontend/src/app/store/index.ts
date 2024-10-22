import { Role } from '@vault/shared';
import { ReducerAuthState as AuthState } from './reducers/auth.reducer';
import { ReducerTournamentsState } from './reducers/tournaments.reducer';
import { ReducerDraftState } from './reducers/draft.reducer';
import { ReducerMatchState } from './reducers/match.reducer';
import { createSelector } from '@ngrx/store';

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
export const selectAdminStatus = createSelector(
  selectAuth,
  (state: AuthState) => state.user?.roles?.includes(Role.Admin)
);
export const selectErrorMessage = createSelector(
  selectAuth,
  (state: AuthState) => state.errorMessage
);
export const isLoading = createSelector(selectAuth, (state: AuthState) => {
  return state.isAuthenticated == null;
});

// TOURNAMENTS
export interface TournamentsState {
  tournaments: ReducerTournamentsState;
}
export const selectAllTournaments = (state: TournamentsState) =>
  state.tournaments.all;
export const selectAvailableTournaments = (state: TournamentsState) =>
  state.tournaments.available;
export const selectEnrolledTournaments = (state: TournamentsState) =>
  state.tournaments.enrolled;
export const selectSelectedTournament = (state: TournamentsState) =>
  state.tournaments.selected;

// DRAFTS
export interface DraftState {
  draft: ReducerDraftState;
}
export const selectOngoingDrafts = (state: DraftState) => state.draft.ongoing;
export const selectCurrentDraft = (state: DraftState) => state.draft.current;
export const selectSelectedDraft = (state: DraftState) => state.draft.selected;

// MATCHES
export interface MatchState {
  match: ReducerMatchState;
}
export const selectCurrentMatch = (state: MatchState) => state.match.current;
export const selectCurrentMatchId = (state: MatchState) =>
  state.match.current!.game.id;
