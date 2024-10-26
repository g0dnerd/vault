import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { PushPipe } from '@ngrx/component';

import { Enrollment, Tournament, User } from '@vault/shared';
import { RegisterPanelComponent } from './register-panel.component';
import {
  AuthAppState,
  selectAvailableTournaments,
  selectAuthUser,
  TournamentAppState,
} from '../../store';
import {
  initAvailable,
  register,
} from '../../store/actions/tournaments.actions';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  imports: [RegisterPanelComponent, NgFor, PushPipe],
  templateUrl: 'available-tournaments.component.html',
  styleUrl: 'available-tournaments.component.css',
})
export class AvailableTournamentsComponent implements OnInit {
  availableTournaments$: Observable<Tournament[]> = of([]);
  user$: Observable<User | null> = of(null);

  constructor(
    private readonly tournamentStore$: Store<TournamentAppState>,
    private readonly authStore$: Store<AuthAppState>
  ) {}

  ngOnInit() {
    this.tournamentStore$.dispatch(initAvailable());
    this.availableTournaments$ = this.tournamentStore$.select(
      selectAvailableTournaments
    );
    this.user$ = this.authStore$.select(selectAuthUser);
  }

  // Handler for the event emitter in `RegisterPanelComponent`,
  // dispatches registration to `tournamentStore$`
  registerTournament(registrationData: Enrollment) {
    const { userId, tournamentId } = registrationData;
    this.tournamentStore$.dispatch(register({ tournamentId, userId }));
  }
}
