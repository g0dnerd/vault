import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { Role } from '@vault/shared';
import { AuthGuard } from '../_helpers';
import { AvailableTournamentsComponent } from './available-tournaments';
import { MyTournamentsComponent } from './my-tournaments';
import { TournamentDashboardComponent } from './dashboard/tournament-dashboard.component';
import { AdminDashboardComponent } from '../admin/admin-dashboard.component';
import { AdminTournamentDashboardComponent } from '../admin/admin-tournament-dashboard.component';
import * as draftEffects from '../_store/effects/draft.effects';
import * as imageEffects from '../_store/effects/image.effects';
import * as matchEffects from '../_store/effects/match.effects';
import * as playerEffects from '../_store/effects/player.effects';
import * as tournamentEffects from '../_store/effects/tournaments.effects';
import { draftReducer } from '../_store/reducers/draft.reducer';
import { imageReducer } from '../_store/reducers/image.reducer';
import { matchReducer } from '../_store/reducers/match.reducer';
import { playerReducer } from '../_store/reducers/player.reducer';
import { tournamentReducer } from '../_store/reducers/tournaments.reducer';
import { LeaguesHomeComponent } from '../leagues/leagues-home.component';

export const TOURNAMENT_ROUTES: Routes = [
  {
    path: '',
    component: MyTournamentsComponent,
    providers: [
      provideEffects(tournamentEffects),
      provideState('tournaments', tournamentReducer),
      provideEffects(draftEffects),
      provideState('drafts', draftReducer),
      provideEffects(matchEffects),
      provideState('images', imageReducer),
      provideEffects(imageEffects),
      provideState('matches', matchReducer),
      provideEffects(playerEffects),
      provideState('players', playerReducer),
    ],
    canActivate: [AuthGuard],
    data: { requiredRole: Role.Player },
  },
  {
    path: 'available',
    component: AvailableTournamentsComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: Role.Player },
  },
  { path: 'leagues', component: LeaguesHomeComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: Role.Admin },
  },
  {
    path: 'admin/:id',
    component: AdminTournamentDashboardComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: Role.Admin },
  },
  {
    path: ':id',
    component: TournamentDashboardComponent,
    canActivate: [AuthGuard],
  },
];
