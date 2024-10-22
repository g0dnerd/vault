import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Tournament } from '@vault/shared';
import { TournamentDetailCardComponent } from './tournament-detail-card.component';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectEnrolledTournaments, TournamentsState } from '../../store';
import { CommonModule } from '@angular/common';
import { initEnrolled } from '../../store/actions/tournaments.actions';
import { PushPipe } from '@ngrx/component';

@Component({
  templateUrl: 'my-tournaments.component.html',
  standalone: true,
  imports: [RouterLink, TournamentDetailCardComponent, CommonModule, PushPipe],
})
export class MyTournamentsComponent implements OnInit {
  enrolledTournaments$: Observable<Tournament[]> = of([]);

  constructor(private readonly store$: Store<TournamentsState>) { }

  ngOnInit(): void {
    this.store$.dispatch(initEnrolled());
    this.enrolledTournaments$ = this.store$.select(selectEnrolledTournaments);
  }
}
