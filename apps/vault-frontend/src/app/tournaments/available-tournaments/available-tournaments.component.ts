import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { RegisterPanelComponent } from './register-panel.component';
import { Tournament, User } from '@vault/shared';
import {
  AuthAppState,
  selectAvailableTournaments,
  selectAuthUser,
  TournamentsState,
} from '../../store';
import {
  initAvailable,
  register,
} from '../../store/actions/tournaments.actions';

export interface EnrollmentRegistration {
  tournamentId: number;
  userId: number;
}

@Component({
  standalone: true,
  imports: [RegisterPanelComponent, CommonModule],
  templateUrl: 'available-tournaments.component.html',
  styleUrl: 'available-tournaments.component.css',
})
export class AvailableTournamentsComponent implements OnInit {
  availableTournaments$: Observable<Tournament[]> = of([]);
  user$: Observable<User | null> = of(null);

  constructor(
    private readonly tournamentStore$: Store<TournamentsState>,
    private readonly authStore$: Store<AuthAppState>
  ) {}

  ngOnInit() {
    this.tournamentStore$.dispatch(initAvailable());
    this.availableTournaments$ = this.tournamentStore$.select(
      selectAvailableTournaments
    );
    this.user$ = this.authStore$.select(selectAuthUser);
  }

  registerTournament(payload: EnrollmentRegistration) {
    const { userId, tournamentId } = payload;
    console.log(
      `Register event emitter trying to dispatch registration for user ${userId} in tournament ${tournamentId}`
    );
    this.tournamentStore$.dispatch(register({ tournamentId, userId }));
  }
}
