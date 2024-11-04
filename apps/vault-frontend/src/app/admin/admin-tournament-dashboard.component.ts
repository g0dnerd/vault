import { Component, Input, numberAttribute } from '@angular/core';
import { NgIf } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

import { Tournament } from '@vault/shared';
import { selectTournamentById, State } from '../store';
import { AdminDraftListComponent } from './draft/admin-draft-list.component';

@Component({
  selector: 'app-admin-tournament-dashboard',
  standalone: true,
  imports: [NgIf, PushPipe, AdminDraftListComponent],
  templateUrl: './admin-tournament-dashboard.component.html',
  styleUrl: './admin-tournament-dashboard.component.css',
})
export class AdminTournamentDashboardComponent {
  tournament$: Observable<Tournament | undefined> = of(undefined);
  @Input({ transform: numberAttribute }) id = 0;

  constructor(private readonly store$: Store<State>) {
    this.tournament$ = this.store$.select(selectTournamentById(this.id));
  }
}
