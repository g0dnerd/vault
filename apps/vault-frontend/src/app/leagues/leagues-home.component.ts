import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Enrollment, Tournament, User } from '@vault/shared';
import {
  AuthAppState,
  selectAuthUser,
  selectAvailableLeagues,
  State,
} from '../_store';
import {
  initializeAllTournaments,
  initializeAvailableTournaments,
  register,
} from '../_store/actions/tournaments.actions';
import { RegisterPanelComponent } from '../tournaments/available-tournaments';

@Component({
  selector: 'app-leagues-home',
  standalone: true,
  imports: [NgFor, PushPipe, RegisterPanelComponent],
  templateUrl: './leagues-home.component.html',
  styleUrl: './leagues-home.component.css',
})
export class LeaguesHomeComponent implements OnInit {
  private readonly store$ = inject(Store<State>);
  private readonly authStore$ = inject(Store<AuthAppState>);

  readonly user$: Observable<User | null> =
    this.authStore$.select(selectAuthUser);
  readonly availableLeagues$: Observable<Tournament[]> = this.store$.select(
    selectAvailableLeagues
  );

  ngOnInit() {
    this.store$.dispatch(initializeAllTournaments());
    this.store$.dispatch(initializeAvailableTournaments());
  }

  registerTournament(registrationData: Enrollment) {
    const { userId, tournamentId } = registrationData;
    this.store$.dispatch(register({ tournamentId, userId }));
  }
}
