import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { CreateTournamentComponent } from './create-tournament.component';
import { AdminTournamentListComponent } from '../admin/admin-tournament-list.component';
import { State } from '../store';
import { initializeAllMatches } from '../store/actions/match.actions';

@Component({
  standalone: true,
  imports: [CreateTournamentComponent, AdminTournamentListComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(private readonly matchStore$: Store<State>) {}

  ngOnInit() {
    this.matchStore$.dispatch(initializeAllMatches());
  }
}
