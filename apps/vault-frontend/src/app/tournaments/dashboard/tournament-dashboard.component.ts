import { NgIf } from '@angular/common';
import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { PushPipe } from '@ngrx/component';

import { Tournament } from '@vault/shared';
import { DraftPanelComponent } from './draft-panel.component';
import { DraftAppState, selectTournamentById, State } from '../../_store';
import { initCurrent } from '../../_store/actions/draft.actions';
import { initializeAllPlayers } from '../../_store/actions/player.actions';
import { initializeAllTournaments } from '../../_store/actions/tournaments.actions';
import { initializeAllImages } from '../../_store/actions/image.actions';

@Component({
  selector: 'app-tournament-dashboard',
  standalone: true,
  imports: [NgIf, RouterLink, DraftPanelComponent, PushPipe],
  templateUrl: './tournament-dashboard.component.html',
  styleUrl: './tournament-dashboard.component.css',
})
export class TournamentDashboardComponent implements OnInit {
  tournament$: Observable<Tournament | undefined> = of(undefined);

  constructor(
    private readonly store$: Store<State>,
    private readonly draftStore$: Store<DraftAppState>
  ) {}

  @Input({ transform: numberAttribute }) id = 0;

  ngOnInit() {
    this.store$.dispatch(initializeAllTournaments());
    this.store$.dispatch(initializeAllPlayers());
    this.store$.dispatch(initializeAllImages());
    this.draftStore$.dispatch(initCurrent({ tournamentId: this.id }));
    this.tournament$ = this.store$.select(selectTournamentById(this.id));
  }
}
