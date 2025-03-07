import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PushPipe } from '@ngrx/component';

import { Enrollment, Tournament, User } from '@vault/shared';
import { RegisterPanelComponent } from './register-panel.component';
import { AuthAppState, selectAvailableTournaments, State } from '../../_store';
import {
  initializePublicTournaments,
  initializeAvailableTournaments,
  register,
} from '../../_store/actions/tournaments.actions';

@Component({
  standalone: true,
  imports: [RegisterPanelComponent, NgFor, PushPipe],
  templateUrl: 'available-tournaments.component.html',
  styleUrl: 'available-tournaments.component.css',
})
export class AvailableTournamentsComponent implements OnInit {
  private readonly store$ = inject(Store<State>);

  readonly availableTournaments$: Observable<Tournament[]> = this.store$.select(
    selectAvailableTournaments
  );

  ngOnInit() {
    this.store$.dispatch(initializePublicTournaments());
    this.store$.dispatch(initializeAvailableTournaments());
  }

  // Handler for the event emitter in `RegisterPanelComponent`,
  // dispatches registration to `tournamentStore$`
  registerTournament(registrationData: Enrollment) {
    const { tournamentId } = registrationData;
    this.store$.dispatch(register({ tournamentId }));
  }
}
