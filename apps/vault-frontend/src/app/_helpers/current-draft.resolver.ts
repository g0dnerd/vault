import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, switchMap, take, tap } from 'rxjs';

import {
  AuthAppState,
  DraftAppState,
  selectCurrentDraft,
  selectMatchByQuery,
  selectUserId,
  State,
} from '../_store';
import { initCurrent } from '../_store/actions/draft.actions';
import { initializeMatchesForDraft } from '../_store/actions/match.actions';
import { Match } from '@vault/shared';

@Injectable({
  providedIn: 'root',
})
export class CurrentDraftResolver implements Resolve<Match> {
  constructor(
    private readonly authStore$: Store<AuthAppState>,
    private readonly draftStore$: Store<DraftAppState>,
    private readonly matchStore: Store<State>
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Match> {
    const tournamentId = route.params['id'];

    // Dispatch initCurrent action to initialize the current draft
    this.draftStore$.dispatch(initCurrent({ tournamentId }));

    // First, wait for a non-null current draft
    // TODO: this is stupid and doesn't work, what if there is no active draft?
    return this.draftStore$.select(selectCurrentDraft).pipe(
      filter((draft) => draft !== null), // Ensure draft is not null
      take(1), // Take the first non-null draft
      tap((draft) => {
        // Dispatch initializeMatches action with the draftId
        this.matchStore.dispatch(
          initializeMatchesForDraft({ draftId: draft!.id })
        );
      }),
      // After initializing matches, select the user ID
      switchMap(() =>
        this.authStore$.select(selectUserId).pipe(
          filter((userId) => userId !== null), // Ensure userId is not null
          take(1), // Take the first user ID
          // Then, find the match involving this user
          switchMap((userId) =>
            this.matchStore
              .select(
                selectMatchByQuery(
                  (game) =>
                    game.player1?.enrollment?.userId === userId ||
                    game.player2?.enrollment?.userId === userId
                )
              )
              .pipe(
                filter((game): game is Match => game !== undefined), // Ensure game is defined
                take(1) // Take the first match found
              )
          )
        )
      )
    );
  }
}
