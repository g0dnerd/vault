import { Component } from '@angular/core';

import { CreateTournamentComponent } from './create-tournament.component';
import { AdminTournamentListComponent } from '../admin/admin-tournament-list.component';

@Component({
  standalone: true,
  imports: [CreateTournamentComponent, AdminTournamentListComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {}
