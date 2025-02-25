import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as PlayerActions from '../actions/player.actions';
import { AlertService } from '../../_services';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { DraftPlayerService } from '../../_services/draft-player.service';

export const playerStoreFailure = createEffect(
  (actions$ = inject(Actions), alertService = inject(AlertService)) => {
    return actions$.pipe(
      ofType(PlayerActions.playerStoreFailure),
      tap(({ errorMessage }) => {
        alertService.error(errorMessage, true);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const initializeAllPlayers = createEffect(
  (actions$ = inject(Actions), playerService = inject(DraftPlayerService)) => {
    return actions$.pipe(
      ofType(PlayerActions.initializePlayersForTournament),
      mergeMap(({ tournamentId }) => {
        return playerService.getPlayersForTournament(tournamentId).pipe(
          map((players) => {
            return PlayerActions.loadPlayers({ players });
          }),
          catchError((error) => {
            return of(
              PlayerActions.playerStoreFailure({ errorMessage: error.message })
            );
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);
