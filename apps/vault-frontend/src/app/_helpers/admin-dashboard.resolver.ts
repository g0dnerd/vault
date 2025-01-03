import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';

import { Match } from '@vault/shared';
import { selectAllMatches, State } from '../store';
import { initializeAllMatches } from '../store/actions/match.actions';
import { initializeAllTournaments } from '../store/actions/tournaments.actions';

@Injectable({
  providedIn: 'root',
})
// Ensures the admin tournament dashboard has access
// to all matches
export class AdminDashboardResolver implements Resolve<Match[]> {
  constructor(private readonly store$: Store<State>) {}

  resolve(): Observable<Match[]> {
    // Dispatch initAll action to get all matches from the API
    this.store$.dispatch(initializeAllMatches());
    this.store$.dispatch(initializeAllTournaments());

    return this.store$
      .select(selectAllMatches)
      .pipe(filter((matches) => matches.length > 0));
  }
}
