import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

import { AlertService, EnrollmentsService, TournamentService } from '../../_services';
import * as TournamentsActions from '../actions/tournaments.actions';

export const initAllEffect = createEffect(
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

export const initAvailableEffect = createEffect(
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

export const initEnrolledEffect = createEffect(
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

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    enrollmentService = inject(EnrollmentsService)
  ) => {
    return actions$.pipe(
      ofType(TournamentsActions.register),
      mergeMap(({ tournamentId, userId }) => {
        return enrollmentService.enrollUser(tournamentId, userId).pipe(
          map((res) => {
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
              TournamentsActions.registerFailure({ errorMessage: error.message })
            );
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);

export const registerSuccessEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router), alertService = inject(AlertService)) => {
    return actions$.pipe(
      ofType(TournamentsActions.registerSuccess),
      tap(({ tournament }) => {
        alertService.success(`You have successfully registered for ${tournament.name},`, true);
        router.navigate(['/tournaments']);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const selectTournamentEffect = createEffect(
  (actions$ = inject(Actions), tournamentService = inject(TournamentService)) => {
    return actions$.pipe(
      ofType(TournamentsActions.selectTournament),
      mergeMap(({ id: payload }) => {
        return tournamentService.getById(payload).pipe(
          map((tournament) => {
            return TournamentsActions.selectTournamentSuccess({ tournament });
          }),
          catchError((error) => {
            return of(TournamentsActions.selectTournamentFailure({ errorMessage: error.message }));
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);

