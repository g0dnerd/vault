import { NgIf } from '@angular/common';
import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { PushPipe } from '@ngrx/component';

import { Tournament } from '@vault/shared';
import { MatchPanelComponent } from './match-panel.component';
import { DraftPanelComponent } from './draft-panel.component';
import {
  DraftAppState,
  MatchAppState,
  selectSelectedTournament,
  TournamentAppState,
} from '../../store';
import { initCurrent } from '../../store/actions/match.actions';
import * as draftActions from '../../store/actions/draft.actions';
import { selectTournament } from '../../store/actions/tournaments.actions';

@Component({
  selector: 'app-tournament-dashboard',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    MatchPanelComponent,
    DraftPanelComponent,
    PushPipe,
  ],
  templateUrl: './tournament-dashboard.component.html',
  styleUrl: './tournament-dashboard.component.css',
})
export class TournamentDashboardComponent implements OnInit {
  tournament$: Observable<Tournament | null> = of(null);

  constructor(
    private readonly tournamentStore$: Store<TournamentAppState>,
    private readonly matchStore$: Store<MatchAppState>,
    private readonly draftStore$: Store<DraftAppState>
  ) {}

  @Input({ transform: numberAttribute }) id = 0;

  ngOnInit() {
    this.tournamentStore$.dispatch(selectTournament({ id: this.id }));
    this.matchStore$.dispatch(initCurrent({ tournamentId: this.id }));
    this.draftStore$.dispatch(draftActions.initCurrent());
    this.tournament$ = this.tournamentStore$.select(selectSelectedTournament);
  }
}
