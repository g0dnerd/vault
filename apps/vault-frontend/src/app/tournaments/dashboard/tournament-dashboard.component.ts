import { NgIf } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { PushPipe } from '@ngrx/component';

import { Enrollment, Tournament } from '@vault/shared';
import { DraftPanelComponent } from './draft-panel.component';
import {
  DraftAppState,
  selectEnrollmentByQuery,
  selectTournamentById,
  State,
} from '../../_store';
import { initCurrent } from '../../_store/actions/draft.actions';
import { initializePlayersForTournament } from '../../_store/actions/player.actions';
import { initializeAllTournaments } from '../../_store/actions/tournaments.actions';
import { initializeAllEnrollments } from '../../_store/actions/enrollment.actions';

@Component({
  selector: 'app-tournament-dashboard',
  standalone: true,
  imports: [NgIf, RouterLink, DraftPanelComponent, PushPipe],
  templateUrl: './tournament-dashboard.component.html',
  styleUrl: './tournament-dashboard.component.css',
})
export class TournamentDashboardComponent implements OnInit {
  id = input.required<number>();

  private readonly store$ = inject(Store<State>);
  private readonly draftStore$ = inject(Store<DraftAppState>);

  tournament$: Observable<Tournament | undefined> = of(undefined);
  enrollment$: Observable<Enrollment | undefined> = of(undefined);

  ngOnInit() {
    this.store$.dispatch(initializeAllTournaments());
    this.store$.dispatch(
      initializePlayersForTournament({ tournamentId: this.id() })
    );
    this.store$.dispatch(initializeAllEnrollments());
    this.draftStore$.dispatch(initCurrent({ tournamentId: this.id() }));
    this.tournament$ = this.store$.select(selectTournamentById(this.id()));
    this.enrollment$ = this.store$.select(
      selectEnrollmentByQuery(
        (enrollment: Enrollment) => enrollment?.tournamentId == this.id()
      )
    );
  }
}
