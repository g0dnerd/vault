import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Enrollment, Tournament } from '@vault/shared';
import {
  selectAvailableLeagues,
  selectEnrolledLeagues,
  State,
} from '../_store';
import {
  initializeAllTournaments,
  initializeAvailableTournaments,
  initializeEnrolledTournaments,
  register,
} from '../_store/actions/tournaments.actions';
import { LeagueDetailCardComponent } from './league-detail-card.component';
import { RegisterPanelComponent } from '../tournaments/available-tournaments';

@Component({
  selector: 'app-leagues-home',
  standalone: true,
  imports: [
    LeagueDetailCardComponent,
    NgIf,
    NgFor,
    PushPipe,
    RegisterPanelComponent,
  ],
  templateUrl: './leagues-home.component.html',
  styleUrl: './leagues-home.component.css',
})
export class LeaguesHomeComponent implements OnInit {
  private readonly store$ = inject(Store<State>);

  readonly availableLeagues$: Observable<Tournament[]> = this.store$.select(
    selectAvailableLeagues
  );
  readonly enrolledLeagues$: Observable<Tournament[]> = this.store$.select(
    selectEnrolledLeagues
  );

  ngOnInit() {
    this.store$.dispatch(initializeAllTournaments());
    this.store$.dispatch(initializeAvailableTournaments());
    this.store$.dispatch(initializeEnrolledTournaments());
  }

  registerTournament(registrationData: Enrollment) {
    const { tournamentId } = registrationData;
    this.store$.dispatch(register({ tournamentId }));
  }
}
