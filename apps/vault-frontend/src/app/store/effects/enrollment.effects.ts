import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import * as EnrollmentActions from '../actions/enrollment.actions';
import { EnrollmentsService } from '../../_services';

// Gets the enrollment for the currently authenticated user
// in the given tournament and stores it in state.
// Dispatches a getByTournamentIdFailure action on error response
// from the API.
export const getByTournamentId = createEffect(
  (
    actions$ = inject(Actions),
    enrollmentService = inject(EnrollmentsService)
  ) => {
    return actions$.pipe(
      ofType(EnrollmentActions.getByTournamentId),
      mergeMap(({ userId, tournamentId }) => {
        return enrollmentService
          .getForUserIdAndTournamentId(userId, tournamentId)
          .pipe(
            map((current) => {
              return EnrollmentActions.getByTournamentIdSuccess({ current });
            }),
            catchError((error) => {
              return of(
                EnrollmentActions.getByTournamentIdFailure({
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
