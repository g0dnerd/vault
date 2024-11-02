import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

import * as MatchActions from '../actions/match.actions';
import { AlertService, MatchService } from '../../_services';

export const gameStoreFailure = createEffect(
  (actions$ = inject(Actions), alertService = inject(AlertService)) => {
    return actions$.pipe(
      ofType(MatchActions.matchStoreFailure),
      tap(({ errorMessage }) => {
        alertService.error(errorMessage, true);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const initializeAllMatches = createEffect(
  (actions$ = inject(Actions), matchService = inject(MatchService)) => {
    return actions$.pipe(
      ofType(MatchActions.initializeAllMatches),
      mergeMap(() => {
        return matchService.getAllMatches().pipe(
          map((matches) => {
            return MatchActions.loadMatches({ matches });
          }),
          catchError((error) => {
            return of(
              MatchActions.matchStoreFailure({ errorMessage: error.message })
            );
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);

export const initializeMatchesForDraft = createEffect(
  (actions$ = inject(Actions), matchService = inject(MatchService)) => {
    return actions$.pipe(
      ofType(MatchActions.initializeMatchesForDraft),
      mergeMap(({ draftId }) => {
        return matchService.getMatchesForDraft(draftId).pipe(
          map((matches) => {
            return MatchActions.loadMatches({ matches });
          }),
          catchError((error) => {
            return of(
              MatchActions.matchStoreFailure({ errorMessage: error.message })
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
            return MatchActions.updateMatch({
              update: { id: game.id, changes: game },
            });
          }),
          catchError((error) => {
            return of(
              MatchActions.matchStoreFailure({
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
