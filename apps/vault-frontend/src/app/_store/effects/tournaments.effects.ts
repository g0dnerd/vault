import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

import {
  AlertService,
  EnrollmentsService,
  TournamentService,
} from '../../_services';
import { State } from '..';
import * as TournamentsActions from '../actions/tournaments.actions';

export const tournamentStoreFailure = createEffect(
  (actions$ = inject(Actions), alertService = inject(AlertService)) => {
    return actions$.pipe(
      ofType(TournamentsActions.tournamentStoreFailure),
      tap(({ errorMessage }) => {
        alertService.error(errorMessage, true);
      })
    );
  },
  { functional: true, dispatch: false }
);

// Gets all tournaments from the tournamentService
// and stores them in state.
export const initAllTournaments = createEffect(
  (
    actions$ = inject(Actions),
    tournamentService = inject(TournamentService)
  ) => {
    return actions$.pipe(
      ofType(TournamentsActions.initializeAllTournaments),
      mergeMap(() => {
        return tournamentService.getAllTournaments().pipe(
          map((tournaments) => {
            return TournamentsActions.loadTournaments({ tournaments });
          }),
          catchError((error) => {
            return of(
              TournamentsActions.tournamentStoreFailure({
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
      ofType(TournamentsActions.initializeAvailableTournaments),
      mergeMap(() => {
        return tournamentService.getAvailableTournaments().pipe(
          map((availableTournaments) => {
            const ids = availableTournaments.map((t) => t.id);
            return TournamentsActions.setAvailableTournaments({ ids });
          }),
          catchError((error) => {
            return of(
              TournamentsActions.tournamentStoreFailure({
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
export const initEnrolled = createEffect(
  (
    actions$ = inject(Actions),
    tournamentService = inject(TournamentService)
  ) => {
    return actions$.pipe(
      ofType(TournamentsActions.initializeEnrolledTournaments),
      mergeMap(() => {
        return tournamentService.getUserTournaments().pipe(
          map((enrolledTournaments) => {
            const ids = enrolledTournaments.map((t) => t.id);
            return TournamentsActions.setEnrolledTournaments({ ids });
          }),
          catchError((error) => {
            return of(
              TournamentsActions.tournamentStoreFailure({
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
    enrollmentService = inject(EnrollmentsService),
    store$ = inject(Store<State>)
  ) => {
    return actions$.pipe(
      ofType(TournamentsActions.register),
      mergeMap(({ tournamentId }) => {
        return enrollmentService.enrollUser(tournamentId).pipe(
          map((res) => {
            // If the response did not contain a tournament,
            // the user could not be enrolled. Return an error.
            if (!res.tournament) {
              return TournamentsActions.tournamentStoreFailure({
                errorMessage: 'Failed to register for tournament',
              });
            }
            store$.dispatch(TournamentsActions.initializeEnrolledTournaments());
            return TournamentsActions.initializeAvailableTournaments();
          }),
          catchError((error) => {
            return of(
              TournamentsActions.tournamentStoreFailure({
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
