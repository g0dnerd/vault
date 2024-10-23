import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { Tournament } from '@vault/shared';
import { TournamentDetailCardComponent } from './tournament-detail-card.component';
import { selectEnrolledTournaments, TournamentAppState } from '../../store';
import { initEnrolled } from '../../store/actions/tournaments.actions';

@Component({
  templateUrl: 'my-tournaments.component.html',
  standalone: true,
  imports: [RouterLink, TournamentDetailCardComponent, CommonModule, PushPipe],
})
export class MyTournamentsComponent implements OnInit {
  enrolledTournaments$: Observable<Tournament[]> = of([]);

  constructor(private readonly store$: Store<TournamentAppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(initEnrolled());
    this.enrolledTournaments$ = this.store$.select(selectEnrolledTournaments);
  }
}
