import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { EnrollmentsService, TournamentService } from '../../_services';
import * as TournamentsActions from '../actions/tournaments.actions';

// Gets all tournaments from the tournamentService
// and stores them in state.
// Dispatches an initAllFailure action on error reponse
// from the API.
export const initAll = createEffect(
  (
    actions$ = inject(Actions),
    tournamentService = inject(TournamentService)
  ) => {
    return actions$.pipe(
      ofType(TournamentsActions.initAll),
      mergeMap(() => {
        return tournamentService.getAllTournaments().pipe(
          map((allTournaments) => {
            return TournamentsActions.initAllSuccess({
              allTournaments,
            });
          }),
          catchError((error) => {
            return of(
              TournamentsActions.initAllFailure({
                errorMessage: error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);

// Gets all available tournaments for the current user
// from the tournamentService and stores them in state.
// Dispatches an initAvailableFailure action
// on error reponse from the API.
export const initAvailable = createEffect(
  (
    actions$ = inject(Actions),
    tournamentService = inject(TournamentService)
  ) => {
    return actions$.pipe(
      ofType(TournamentsActions.initAvailable),
      mergeMap(() => {
        return tournamentService.getAvailableTournaments().pipe(
          map((availableTournaments) => {
            return TournamentsActions.initAvailableSuccess({
              availableTournaments,
            });
          }),
          catchError((error) => {
            return of(
              TournamentsActions.initAvailableFailure({
                errorMessage: error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);

// Gets all enrolled tournaments for the current user
// from the tournamentService and stores them in state.
// Dispatches an initEnrolledFailure action
// on error reponse from the API.
export const initEnrolled = createEffect(
  (
    actions$ = inject(Actions),
    tournamentService = inject(TournamentService)
  ) => {
    return actions$.pipe(
      ofType(TournamentsActions.initEnrolled),
      mergeMap(() => {
        return tournamentService.getUserTournaments().pipe(
          map((enrolledTournaments) => {
            return TournamentsActions.initEnrolledSuccess({
              enrolledTournaments,
            });
          }),
          catchError((error) => {
            return of(
              TournamentsActions.initEnrolledFailure({
                errorMessage: error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);

// Registers the user with `userId` for the tournament
// with `tournamentId`. Returns the tournament object
// on success and a registerFailure on error response
// from the API.
export const register = createEffect(
  (
    actions$ = inject(Actions),
    enrollmentService = inject(EnrollmentsService)
  ) => {
    return actions$.pipe(
      ofType(TournamentsActions.register),
      mergeMap(({ tournamentId, userId }) => {
        return enrollmentService.enrollUser(tournamentId, userId).pipe(
          map((res) => {
            // If the response did not contain a tournament,
            // the user could not be enrolled, return an error.
            // TODO: make this a proper error response
            if (!res.tournament)
              return TournamentsActions.registerFailure({
                errorMessage: 'Enrollment error',
              });
            return TournamentsActions.registerSuccess({
              tournament: res.tournament,
            });
          }),
          catchError((error) => {
            return of(
              TournamentsActions.registerFailure({
                errorMessage: error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);

// Selects a tournament by ID for a detail page view
// and stores it into state.
export const selectTournamentEffect = createEffect(
  (
    actions$ = inject(Actions),
    tournamentService = inject(TournamentService)
  ) => {
    return actions$.pipe(
      ofType(TournamentsActions.selectTournament),
      mergeMap(({ id: payload }) => {
        return tournamentService.getById(payload).pipe(
          map((tournament) => {
            return TournamentsActions.selectTournamentSuccess({ tournament });
          }),
          catchError((error) => {
            return of(
              TournamentsActions.selectTournamentFailure({
                errorMessage: error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);
