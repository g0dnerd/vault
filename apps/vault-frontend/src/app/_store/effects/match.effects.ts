import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { MatchService } from '../../_services';
import * as MatchActions from '../actions/match.actions';

export const initCurrentMatchEffect = createEffect(
  (actions$ = inject(Actions), matchService = inject(MatchService)) => {
    return actions$.pipe(
      ofType(MatchActions.initCurrentMatch),
      mergeMap(({ draftId }) => {
        return matchService.getCurrentMatch(draftId).pipe(
          map((current) => {
            return MatchActions.initCurrentMatchSuccess({
              current,
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

export const updateCurrentMatchEffect = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(MatchActions.updateCurrentMatch),
      mergeMap(({ changes }) => {
        return of(
          MatchActions.initCurrentMatchSuccess({
            current: changes,
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);
