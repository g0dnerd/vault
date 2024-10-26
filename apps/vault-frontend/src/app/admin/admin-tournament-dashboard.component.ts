import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

import { Tournament } from '@vault/shared';
import { selectSelectedTournament, TournamentAppState } from '../store';
import { selectTournament } from '../store/actions/tournaments.actions';
import { AdminDraftListComponent } from './draft/admin-draft-list.component';

@Component({
  selector: 'app-admin-tournament-dashboard',
  standalone: true,
  imports: [NgIf, PushPipe, AdminDraftListComponent],
  templateUrl: './admin-tournament-dashboard.component.html',
  styleUrl: './admin-tournament-dashboard.component.css',
})
export class AdminTournamentDashboardComponent implements OnInit {
  tournament$: Observable<Tournament | null> = of(null);

  constructor(private readonly store$: Store<TournamentAppState>) {}

  @Input({ transform: numberAttribute }) id = 0;

  ngOnInit(): void {
    this.store$.dispatch(selectTournament({ id: this.id }));
    this.tournament$ = this.store$.select(selectSelectedTournament);
  }
}
