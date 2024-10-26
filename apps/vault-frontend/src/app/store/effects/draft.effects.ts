import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

import { DraftStandings } from '@vault/shared';
import * as DraftActions from '../actions/draft.actions';
import { DraftService } from '../../_services';

// Gets the currently ongoing draft from `draftService` and stores
// it in state on success.
// Dispatches an `initOngoingFailure` on API error response
export const initOngoing = createEffect(
  (actions$ = inject(Actions), draftService = inject(DraftService)) => {
    return actions$.pipe(
      ofType(DraftActions.initOngoing),
      mergeMap(({ id }) => {
        return draftService.getOngoingDrafts(id).pipe(
          map((allDrafts) => {
            return DraftActions.initOngoingSuccess({
              allDrafts,
            });
          }),
          catchError((error) => {
            return of(
              DraftActions.initOngoingFailure({
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

export const initCurrentEffect = createEffect(
  (actions$ = inject(Actions), draftService = inject(DraftService)) => {
    return actions$.pipe(
      ofType(DraftActions.initCurrent),
      mergeMap(() => {
        return draftService.getCurrentDraft().pipe(
          map((currentDraft) => {
            return DraftActions.initCurrentSuccess({ currentDraft });
          }),
          catchError((error) => {
            return of(
              DraftActions.initCurrentFailure({
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

// Selects a specific draft for the admin draft detail page
// and fetches its details from the draftService.
export const selectDraftEffect = createEffect(
  (actions$ = inject(Actions), draftService = inject(DraftService)) => {
    return actions$.pipe(
      ofType(DraftActions.selectDraft),
      mergeMap(({ id }) => {
        return draftService.getById(id).pipe(
          map((draft) => {
            // Pass the returned draft to the success action, which stores it in the state
            return DraftActions.selectDraftSuccess({ draft });
          }),
          catchError((error) => {
            return of(
              DraftActions.selectDraftFailure({ errorMessage: error.message })
            );
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);

// Makes a request to draftService.makeStandings to generate a standings
// table specific to a draft and round. This is then returned as an object
// of the DraftStandings interface, containing draftId, round and the standings
// as a Map<number, DraftScorecard>.
export const makeDraftStandingsEffect = createEffect(
  (actions$ = inject(Actions), draftService = inject(DraftService)) => {
    return actions$.pipe(
      ofType(DraftActions.makeDraftStandings),
      switchMap(({ draftId, round }) => {
        return draftService.makeStandings(draftId, round).pipe(
          map((scorecards) => {
            // Sort the returned scorecards by tiebreakers in descending order.
            scorecards.sort(
              (a, b) =>
                b.score - a.score ||
                b.omw - a.omw ||
                b.pgw - a.pgw ||
                b.ogw - a.ogw
            );

            // Map sorted scorecard array to a Map<place: number, DraftScorecard>
            const standingsTable = new Map(
              scorecards.map((v, i) => [i, v] as const)
            );
            const standings: DraftStandings = {
              draftId,
              round,
              standingsTable,
            };
            return DraftActions.makeDraftStandingsSuccess({ standings });
          }),
          catchError((error) => {
            return of(
              DraftActions.makeDraftStandingsFailure({
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
