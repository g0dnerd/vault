import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import { Match, Player, Role, Tournament } from '@vault/shared';
import { AuthState } from './reducers/auth.reducer';
import { DraftState } from './reducers/draft.reducer';
import { EnrollmentState } from './reducers/enrollment.reducer';

import * as fromMatch from './reducers/match.reducer';
import * as fromPlayer from './reducers/player.reducer';
import * as fromTournament from './reducers/tournaments.reducer';

export interface State {
  matches: fromMatch.MatchState;
  players: fromPlayer.PlayerState;
  tournaments: fromTournament.TournamentState;
}

export const reducers: ActionReducerMap<State> = {
  matches: fromMatch.matchReducer,
  players: fromPlayer.playerReducer,
  tournaments: fromTournament.tournamentReducer,
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
export const selectMatchesByQuery = (query: (game: Match) => boolean) =>
  createSelector(selectMatchState, (state) => {
    return Object.values(state.entities).filter(
      (game): game is Match => !!game && query(game)
    );
  });

// TOURNAMENTS
export const selectTournamentState =
  createFeatureSelector<fromTournament.TournamentState>('tournaments');
export const selectTournamentIds = createSelector(
  selectTournamentState,
  fromTournament.selectTournamentIds
);
export const selectTournamentEntities = createSelector(
  selectTournamentState,
  fromTournament.selectTournamentEntities
);
export const selectAllTournaments = createSelector(
  selectTournamentState,
  fromTournament.selectAllTournaments
);
export const selectTournamentTotal = createSelector(
  selectTournamentState,
  fromTournament.selectTournamentTotal
);
export const selectTournamentById = (tournamentId: number) =>
  createSelector(
    selectTournamentState,
    (tournamentState) => tournamentState.entities[tournamentId]
  );
export const selectTournamentByQuery = (
  query: (tournament: Tournament) => boolean
) =>
  createSelector(selectTournamentState, (state) => {
    return Object.values(state.entities).find(
      (tournament): tournament is Tournament =>
        !!tournament && query(tournament)
    );
  });
export const selectAvailableTournamentIds = createSelector(
  selectTournamentState,
  fromTournament.getAvailableIds
);
export const selectAvailableTournaments = createSelector(
  selectTournamentEntities,
  selectAvailableTournamentIds,
  (tournaments, ids) =>
    ids
      .map((id) => tournaments[id])
      .filter(
        (tournament): tournament is Tournament => tournament !== undefined
      )
);
export const selectEnrolledTournamentIds = createSelector(
  selectTournamentState,
  fromTournament.getEnrolledIds
);
export const selectEnrolledTournaments = createSelector(
  selectTournamentEntities,
  selectEnrolledTournamentIds,
  (tournaments, ids) =>
    ids
      .map((id) => tournaments[id])
      .filter(
        (tournament): tournament is Tournament => tournament !== undefined
      )
);

// PLAYERS
export const selectPlayerState =
  createFeatureSelector<fromPlayer.PlayerState>('players');
export const selectPlayerIds = createSelector(
  selectPlayerState,
  fromPlayer.selectPlayerIds
);
export const selectPlayerEntities = createSelector(
  selectPlayerState,
  fromPlayer.selectPlayerEntities
);
export const selectAllPlayers = createSelector(
  selectPlayerState,
  fromPlayer.selectAllPlayers
);
export const selectPlayerTotal = createSelector(
  selectPlayerState,
  fromPlayer.selectPlayerTotal
);
export const selectPlayerById = (playerId: number) =>
  createSelector(
    selectPlayerState,
    (playerState) => playerState.entities[playerId]
  );
export const selectPlayerByQuery = (query: (player: Player) => boolean) =>
  createSelector(selectPlayerState, (state) => {
    return Object.values(state.entities).find(
      (player): player is Player => !!player && query(player)
    );
  });
export const selectAvailablePlayerIds = createSelector(
  selectPlayerState,
  fromPlayer.getAvailableIds
);
export const selectAvailablePlayers = createSelector(
  selectPlayerEntities,
  selectAvailablePlayerIds,
  (players, ids) =>
    ids
      .map((id) => players[id])
      .filter((player): player is Player => player !== undefined)
);

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
