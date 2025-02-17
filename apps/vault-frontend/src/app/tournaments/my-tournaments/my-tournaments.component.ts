import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Tournament } from '@vault/shared';
import { TournamentDetailCardComponent } from './tournament-detail-card.component';
import { selectEnrolledTournaments, State } from '../../_store';
import {
  initializeAllTournaments,
  initializeEnrolledTournaments,
} from '../../_store/actions/tournaments.actions';

@Component({
  templateUrl: 'my-tournaments.component.html',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, TournamentDetailCardComponent, PushPipe],
})
export class MyTournamentsComponent implements OnInit {
  private readonly store$ = inject(Store<State>);
  readonly enrolledTournaments$: Observable<Tournament[]> = this.store$.select(
    selectEnrolledTournaments
  );

  ngOnInit() {
    this.store$.dispatch(initializeAllTournaments());
    this.store$.dispatch(initializeEnrolledTournaments());
  }
}
