import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

import { Tournament } from '@vault/shared';
import { selectEnrolledTournaments, State } from '../store';
import {
  initializeAllTournaments,
  initializeEnrolledTournaments,
} from '../store/actions/tournaments.actions';

@Injectable({
  providedIn: 'root',
})
export class EnrolledTournamentsResolver implements Resolve<Tournament[]> {
  constructor(private readonly store$: Store<State>) {}

  resolve(): Observable<Tournament[]> {
    this.store$.dispatch(initializeAllTournaments());
    this.store$.dispatch(initializeEnrolledTournaments());
    return this.store$.select(selectEnrolledTournaments).pipe(take(1));
  }
}
