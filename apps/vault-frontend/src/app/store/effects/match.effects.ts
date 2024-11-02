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
