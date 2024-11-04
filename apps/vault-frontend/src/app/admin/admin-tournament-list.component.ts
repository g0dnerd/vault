import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { PushPipe } from '@ngrx/component';

import { Tournament } from '@vault/shared';
import { selectAllTournaments, State } from '../store';
import { initializeAllTournaments } from '../store/actions/tournaments.actions';
import { TournamentAdminCardComponent } from './tournament-admin-card.component';

@Component({
  selector: 'app-admin-tournament-list',
  standalone: true,
  imports: [CommonModule, PushPipe, TournamentAdminCardComponent],
  templateUrl: './admin-tournament-list.component.html',
  styleUrl: './admin-tournament-list.component.css',
})
export class AdminTournamentListComponent implements OnInit {
  allTournaments$: Observable<Tournament[]> = of([]);

  constructor(private readonly tournamentsStore$: Store<State>) {}

  ngOnInit(): void {
    this.tournamentsStore$.dispatch(initializeAllTournaments());
    this.allTournaments$ = this.tournamentsStore$.select(selectAllTournaments);
  }
}
