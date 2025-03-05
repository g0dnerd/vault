import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { Role } from '@vault/shared';
import { AvailableTournamentsComponent } from './available-tournaments';
import { MyTournamentsComponent } from './my-tournaments/my-tournaments.component';
import { TournamentDashboardComponent } from './dashboard/tournament-dashboard.component';
import { AdminDashboardComponent } from '../admin/admin-dashboard.component';
import {
  AdminTournamentDashboardComponent,
  AdminDraftPanelComponent,
} from '../admin';
import { LeaguesHomeComponent } from '../leagues/leagues-home.component';

import * as draftEffects from '../_store/effects/draft.effects';
import * as enrollmentEffects from '../_store/effects/enrollment.effects';
import * as imageEffects from '../_store/effects/image.effects';
import * as matchEffects from '../_store/effects/match.effects';
import * as playerEffects from '../_store/effects/player.effects';
import * as tournamentEffects from '../_store/effects/tournaments.effects';
import { draftReducer } from '../_store/reducers/draft.reducer';
import { enrollmentReducer } from '../_store/reducers/enrollment.reducer';
import { imageReducer } from '../_store/reducers/image.reducer';
import { matchReducer } from '../_store/reducers/match.reducer';
import { playerReducer } from '../_store/reducers/player.reducer';
import { tournamentReducer } from '../_store/reducers/tournaments.reducer';
import { CreateTournamentComponent } from '../admin/create-tournament.component';

export const TOURNAMENT_ROUTES: Routes = [
  {
    path: '',
    component: MyTournamentsComponent,
    providers: [
      provideEffects(tournamentEffects),
      provideState('tournaments', tournamentReducer),
      provideEffects(draftEffects),
      provideState('drafts', draftReducer),
      provideEffects(enrollmentEffects),
      provideState('enrollments', enrollmentReducer),
      provideEffects(matchEffects),
      provideState('matches', matchReducer),
      provideEffects(imageEffects),
      provideState('images', imageReducer),
      provideEffects(playerEffects),
      provideState('players', playerReducer),
    ],
    data: { requiredRole: Role.Player },
  },
  {
    path: 'available',
    component: AvailableTournamentsComponent,
    data: { requiredRole: Role.Player },
  },
  { path: 'leagues', component: LeaguesHomeComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    data: { requiredRole: Role.Admin },
  },
  {
    path: 'admin/create',
    component: CreateTournamentComponent,
    data: { requiredRole: Role.Admin },
  },
  {
    path: ':tournamentId',
    component: TournamentDashboardComponent,
    data: { requiredRole: Role.Player },
  },
  {
    path: 'admin/:tournamentId',
    component: AdminTournamentDashboardComponent,
    data: { requiredRole: Role.Admin },
  },
  {
    path: 'admin/draft/:draftId',
    component: AdminDraftPanelComponent,
    data: { requiredRole: Role.Admin },
  },
];
