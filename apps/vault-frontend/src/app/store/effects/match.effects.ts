import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import * as MatchActions from '../actions/match.actions';
import { MatchService } from '../../_services';

// Gets the current match for the currently authenticated user
// for the given `tournamentId` and stores it in state on success.
// Dispatches an `initCurrentFailure` action on failure.
export const initCurrent = createEffect(
  (actions$ = inject(Actions), matchService = inject(MatchService)) => {
    return actions$.pipe(
      ofType(MatchActions.initCurrent),
      mergeMap(({ tournamentId }) => {
        return matchService.getCurrentUserCurrentMatch(tournamentId).pipe(
          map((currentMatch) => {
            return MatchActions.initCurrentSuccess({
              current: currentMatch,
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
);

// Reports `result` to the matchService and stores the updated game including
// result in state on success.
// Dispatches an `initCurrentFailure` action on error.
export const reportResultEffect = createEffect(
  (actions$ = inject(Actions), matchService = inject(MatchService)) => {
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
);

// Confirms the result for the match with the given `matchId` and stores
// the updated game including result in state on success.
// Dispatches an `initCurrentFailure` action on error.
// TODO: Either differentiate or remove these error types
export const confirmResult = createEffect(
  (actions$ = inject(Actions), matchService = inject(MatchService)) => {
    return actions$.pipe(
      ofType(MatchActions.confirmResult),
      mergeMap(({ matchId }) => {
        return matchService.confirmResult(matchId).pipe(
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
);
