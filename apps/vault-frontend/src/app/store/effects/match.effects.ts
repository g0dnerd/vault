import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import * as MatchActions from '../actions/match.actions';
import { MatchService } from '../../_services';

export const initCurrentEffect = createEffect(
  (
    actions$ = inject(Actions),
    matchService = inject(MatchService)
  ) => {
    return actions$.pipe(
      ofType(MatchActions.initCurrent),
      mergeMap(({ tournamentId: payload }) => {
        return matchService.getCurrentUserCurrentMatch(payload).pipe(
          map((currentMatch) => {
            return MatchActions.initCurrentSuccess({
              currentMatch,
            });
          }),
          catchError((error) => {
            return of(
              MatchActions.initCurrentFailure({
                errorMessage: error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
)

export const reportResultEffect = createEffect(
  (
    actions$ = inject(Actions),
    matchService = inject(MatchService)
  ) => {
    return actions$.pipe(
      ofType(MatchActions.reportResult),
      mergeMap(({ result }) => {
        return matchService.reportResult(result).pipe(
          map((game) => {
            return MatchActions.reportResultSuccess({
              game,
            });
          }),
          catchError((error) => {
            return of(
              MatchActions.initCurrentFailure({
                errorMessage: error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
)
