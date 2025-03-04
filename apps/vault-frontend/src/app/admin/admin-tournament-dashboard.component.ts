import { Component, inject, input, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

import { Draft, Tournament } from '@vault/shared';
import {
  DraftAppState,
  selectOngoingDrafts,
  selectTournamentById,
  State,
} from '../_store';
import { initOngoingDrafts } from '../_store/actions/draft.actions';
import { initializeAllTournaments } from '../_store/actions/tournaments.actions';

@Component({
  selector: 'app-admin-tournament-dashboard',
  standalone: true,
  imports: [NgIf, NgFor, PushPipe, RouterLink],
  templateUrl: './admin-tournament-dashboard.component.html',
  styleUrl: './admin-tournament-dashboard.component.css',
})
export class AdminTournamentDashboardComponent implements OnInit {
  tournamentId = input.required<number>();

  private readonly store$ = inject(Store<State>);
  private readonly draftStore$ = inject(Store<DraftAppState>);

  drafts$: Observable<Draft[]> = of([]);
  tournament$: Observable<Tournament | undefined> = of(undefined);

  ngOnInit() {
    this.store$.dispatch(initializeAllTournaments());
    this.tournament$ = this.store$.select(
      selectTournamentById(this.tournamentId())
    );
    this.draftStore$.dispatch(
      initOngoingDrafts({ tournamentId: this.tournamentId() })
    );
    this.drafts$ = this.draftStore$.select(selectOngoingDrafts);
  }
}
