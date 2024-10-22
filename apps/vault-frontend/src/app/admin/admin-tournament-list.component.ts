import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { PushPipe } from '@ngrx/component';

import { Tournament } from '@vault/shared';
import { selectAllTournaments, TournamentsState } from '../store';
import { initAll } from '../store/actions/tournaments.actions';
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

  constructor(private readonly tournamentsStore$: Store<TournamentsState>) { }

  ngOnInit(): void {
    this.tournamentsStore$.dispatch(initAll());
    this.allTournaments$ = this.tournamentsStore$.select(selectAllTournaments);
  }
}

