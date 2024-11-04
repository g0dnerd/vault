import { NgIf } from '@angular/common';
import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { PushPipe } from '@ngrx/component';

import { Draft, Tournament } from '@vault/shared';
import { MatchPanelComponent } from './match-panel.component';
import { DraftPanelComponent } from './draft-panel.component';
import { selectTournamentById, State } from '../../store';

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
  tournament$: Observable<Tournament | undefined> = of(undefined);
  currentDraft$: Observable<Draft | null> = of(null);

  constructor(private readonly store$: Store<State>) {}

  @Input({ transform: numberAttribute }) id = 0;

  ngOnInit() {
    this.tournament$ = this.store$.select(selectTournamentById(this.id));
  }
}
