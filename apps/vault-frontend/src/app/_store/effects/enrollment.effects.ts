import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

import { AlertService, EnrollmentsService } from '../../_services';
import * as EnrollmentActions from '../actions/enrollment.actions';

export const enrollmentStoreFailure = createEffect(
  (actions$ = inject(Actions), alertService = inject(AlertService)) => {
    return actions$.pipe(
      ofType(EnrollmentActions.enrollmentStoreFailure),
      tap(({ errorMessage }) => {
        alertService.error(errorMessage, true);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const initAllEnrollments = createEffect(
  (
    actions$ = inject(Actions),
    enrollmentService = inject(EnrollmentsService)
  ) => {
    return actions$.pipe(
      ofType(EnrollmentActions.initializeAllEnrollments),
      mergeMap(() => {
        return enrollmentService.getForUser().pipe(
          map((enrollments) => {
            return EnrollmentActions.loadEnrollments({ enrollments });
          }),
          catchError((error) => {
            return of(
              EnrollmentActions.enrollmentStoreFailure({
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

export const initLeaguePlayers = createEffect(
  (
    actions$ = inject(Actions),
    enrollmentService = inject(EnrollmentsService)
  ) => {
    return actions$.pipe(
      ofType(EnrollmentActions.initializeAllLeaguePlayers),
      mergeMap(() => {
        return enrollmentService.getLeaguePlayers().pipe(
          map((enrollments) => {
            return EnrollmentActions.loadEnrollments({ enrollments });
          }),
          catchError((error) => {
            return of(
              EnrollmentActions.enrollmentStoreFailure({
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
