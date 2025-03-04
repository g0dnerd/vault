import { Component, inject, OnInit } from '@angular/core';

import { CreateTournamentComponent } from './create-tournament.component';
import { AdminTournamentListComponent } from '../admin/admin-tournament-list.component';
import { Store } from '@ngrx/store';
import { State } from '../_store';
import { initializeAllTournaments } from '../_store/actions/tournaments.actions';

@Component({
  standalone: true,
  imports: [CreateTournamentComponent, AdminTournamentListComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  private readonly tournamentsStore$ = inject(Store<State>);

  ngOnInit() {
    this.fetchTournaments();
  }

  fetchTournaments() {
    this.tournamentsStore$.dispatch(initializeAllTournaments());
  }
}
