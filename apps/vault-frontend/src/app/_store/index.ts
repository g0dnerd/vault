import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import { Enrollment, Image, Match, Player, Tournament } from '@vault/shared';
import { AuthState } from './reducers/auth.reducer';
import { DraftState } from './reducers/draft.reducer';

import * as fromEnrollment from './reducers/enrollment.reducer';
import * as fromImage from './reducers/image.reducer';
import * as fromMatch from './reducers/match.reducer';
import * as fromPlayer from './reducers/player.reducer';
import * as fromTournament from './reducers/tournaments.reducer';

export interface State {
  images: fromImage.ImageState;
  matches: fromMatch.MatchState;
  players: fromPlayer.PlayerState;
  tournaments: fromTournament.TournamentState;
}

export const reducers: ActionReducerMap<State> = {
  images: fromImage.imageReducer,
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
export const selectAvailableLeagues = createSelector(
  selectTournamentEntities,
  selectAvailableTournamentIds,
  (tournaments, ids) =>
    ids
      .map((id) => tournaments[id])
      .filter(
        (tournament): tournament is Tournament =>
          tournament !== undefined && tournament.isLeague
      )
);
export const selectEnrolledLeagues = createSelector(
  selectTournamentEntities,
  selectEnrolledTournamentIds,
  (tournaments, ids) =>
    ids
      .map((id) => tournaments[id])
      .filter(
        (tournament): tournament is Tournament =>
          tournament !== undefined && tournament.isLeague
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

// IMAGES
export const selectImageState =
  createFeatureSelector<fromImage.ImageState>('images');
export const selectImageIds = createSelector(
  selectImageState,
  fromImage.selectImageIds
);
export const selectImageEntities = createSelector(
  selectImageState,
  fromImage.selectImageEntities
);
export const selectAllImages = createSelector(
  selectImageState,
  fromImage.selectAllImages
);
export const selectImageTotal = createSelector(
  selectImageState,
  fromImage.selectImageTotal
);
export const selectImageById = (imageId: number) =>
  createSelector(
    selectImageState,
    (imageState) => imageState.entities[imageId]
  );
export const selectImageByQuery = (query: (image: Image) => boolean) =>
  createSelector(selectImageState, (state) => {
    return Object.values(state.entities).find(
      (image): image is Image => !!image && query(image)
    );
  });
export const selectPlayerImageIds = createSelector(
  selectImageState,
  fromImage.getPlayerImageIds
);
export const selectPlayerImages = createSelector(
  selectImageEntities,
  selectPlayerImageIds,
  (images, ids) =>
    ids
      .map((id) => images[id])
      .filter((image): image is Image => image !== undefined)
);

// AUTH
export interface AuthAppState {
  auth: AuthState;
}
export const selectAuth = (state: AuthAppState) => state.auth;
export const selectAuthStatus = createSelector(
  selectAuth,
  (state: AuthState) => state.token !== null
);
export const selectAuthToken = createSelector(
  selectAuth,
  (state: AuthState) => state.token
);
export const selectProfileData = createSelector(
  selectAuth,
  (state: AuthState) => state.profileData
);
export const selectUsername = createSelector(
  selectAuth,
  (state: AuthState) => state.profileData?.username
);
export const selectAdminStatus = createSelector(
  selectAuth,
  (state: AuthState) => state.isAdmin
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
export const selectEnrollmentState =
  createFeatureSelector<fromEnrollment.EnrollmentState>('enrollments');
export const selectEnrollmentIds = createSelector(
  selectEnrollmentState,
  fromEnrollment.selectEnrollmentIds
);
export const selectEnrollmentEntities = createSelector(
  selectEnrollmentState,
  fromEnrollment.selectEnrollmentEntities
);
export const selectAllEnrollments = createSelector(
  selectEnrollmentState,
  fromEnrollment.selectAllEnrollments
);
export const selectEnrollmentTotal = createSelector(
  selectEnrollmentState,
  fromEnrollment.selectEnrollmentTotal
);
export const selectEnrollmentById = (enrollmentId: number) =>
  createSelector(
    selectEnrollmentState,
    (enrollmentState) => enrollmentState.entities[enrollmentId]
  );
export const selectEnrollmentByQuery = (
  query: (enrollment: Enrollment) => boolean
) =>
  createSelector(selectEnrollmentState, (state) => {
    return Object.values(state.entities).find(
      (enrollment): enrollment is Enrollment =>
        !!enrollment && query(enrollment)
    );
  });
export const selectLeaguePlayerIds = createSelector(
  selectEnrollmentState,
  fromEnrollment.getLeaguePlayerIds
);
export const selectLeaguePlayers = (tournamentId: number) =>
  createSelector(
    selectEnrollmentEntities,
    selectEnrollmentIds,
    (enrollments, ids) =>
      ids
        .map((id) => enrollments[id])
        .filter(
          (enrollment): enrollment is Enrollment =>
            enrollment !== undefined && enrollment.tournamentId == tournamentId
        )
  );
