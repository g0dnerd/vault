import { NgIf } from '@angular/common';
import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { PushPipe } from '@ngrx/component';

import { MatchPanelComponent } from './match-panel.component';
import { Tournament } from '@vault/shared';
import { DraftPanelComponent } from "./draft-panel.component";
import { selectSelectedTournament, TournamentsState } from '../../store';
import { selectTournament } from '../../store/actions/tournaments.actions';

@Component({
  selector: 'app-tournament-dashboard',
  standalone: true,
  imports: [NgIf, RouterLink, MatchPanelComponent, DraftPanelComponent, PushPipe],
  templateUrl: './tournament-dashboard.component.html',
  styleUrl: './tournament-dashboard.component.css',
})
export class TournamentDashboardComponent implements OnInit {
  tournament$: Observable<Tournament | null> = of(null);

  constructor(private readonly store$: Store<TournamentsState>) { }

  @Input({ transform: numberAttribute }) id = 0;

  ngOnInit() {
    this.store$.dispatch(selectTournament({ id: this.id }));
    this.tournament$ = this.store$.select(selectSelectedTournament);
  }
}
