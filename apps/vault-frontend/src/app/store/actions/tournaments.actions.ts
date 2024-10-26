import { createAction, props } from '@ngrx/store';

import { Tournament } from '@vault/shared';

const TYPE = '[Tournaments]';

export enum TournamentsActionTypes {
  INIT_ALL = `${TYPE} Initialize all tournaments`,
  INIT_ALL_SUCCESS = `${TYPE} Initialize all tournaments success`,
  INIT_ALL_FAILURE = `${TYPE} Initialize all tournaments failure`,
  INIT_AVAILABLE = `${TYPE} Initialize available tournaments`,
  INIT_AVAILABLE_SUCCESS = `${TYPE} Initialize available tournaments success`,
  INIT_AVAILABLE_FAILURE = `${TYPE} Initialize available tournaments failure`,
  INIT_ENROLLED = `${TYPE} Initialize enrolled tournaments`,
  INIT_ENROLLED_SUCCESS = `${TYPE} Initialize enrolled tournaments success`,
  INIT_ENROLLED_FAILURE = `${TYPE} Initialize enrolled tournaments failure`,
  REGISTER = `${TYPE} Register`,
  REGISTER_SUCCESS = `${TYPE} Register Success`,
  REGISTER_FAILURE = `${TYPE} Register Failure`,
  SELECT_TOURNAMENT = `${TYPE} Select tournament`,
  SELECT_TOURNAMENT_SUCCESS = `${TYPE} Select tournament success`,
  SELECT_TOURNAMENT_FAILURE = `${TYPE} Select tournament failure`,
}

export const initAll = createAction(TournamentsActionTypes.INIT_ALL);

export const initAllSuccess = createAction(
  TournamentsActionTypes.INIT_ALL_SUCCESS,
  props<{ allTournaments: Tournament[] }>()
);

export const initAllFailure = createAction(
  TournamentsActionTypes.INIT_ALL_FAILURE,
  props<{ errorMessage: string }>()
);

export const initAvailable = createAction(
  TournamentsActionTypes.INIT_AVAILABLE
);

export const initAvailableSuccess = createAction(
  TournamentsActionTypes.INIT_AVAILABLE_SUCCESS,
  props<{ availableTournaments: Tournament[] }>()
);

export const initAvailableFailure = createAction(
  TournamentsActionTypes.INIT_AVAILABLE_FAILURE,
  props<{ errorMessage: string }>()
);

export const initEnrolled = createAction(TournamentsActionTypes.INIT_ENROLLED);

export const initEnrolledSuccess = createAction(
  TournamentsActionTypes.INIT_ENROLLED_SUCCESS,
  props<{ enrolledTournaments: Tournament[] }>()
);

export const initEnrolledFailure = createAction(
  TournamentsActionTypes.INIT_ENROLLED_FAILURE,
  props<{ errorMessage: string }>()
);

export const register = createAction(
  TournamentsActionTypes.REGISTER,
  props<{ tournamentId: number; userId: number }>()
);

export const registerSuccess = createAction(
  TournamentsActionTypes.REGISTER_SUCCESS,
  props<{ tournament: Tournament }>()
);

export const registerFailure = createAction(
  TournamentsActionTypes.REGISTER_FAILURE,
  props<{ errorMessage: string }>()
);

export const selectTournament = createAction(
  TournamentsActionTypes.SELECT_TOURNAMENT,
  props<{ id: number }>()
);

export const selectTournamentSuccess = createAction(
  TournamentsActionTypes.SELECT_TOURNAMENT_SUCCESS,
  props<{ tournament: Tournament }>()
);

export const selectTournamentFailure = createAction(
  TournamentsActionTypes.SELECT_TOURNAMENT_FAILURE,
  props<{ errorMessage: string }>()
);
