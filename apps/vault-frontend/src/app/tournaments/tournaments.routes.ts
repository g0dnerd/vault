import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { AuthGuard } from '../_helpers';
import { AvailableTournamentsComponent } from './available-tournaments';
import { MyTournamentsComponent } from './my-tournaments';
import { TournamentDashboardComponent } from './dashboard/tournament-dashboard.component';
import { AdminDashboardComponent } from '../admin/admin-dashboard.component';
import { AdminTournamentDashboardComponent } from '../admin/admin-tournament-dashboard.component';
import { Role } from '@vault/shared';
import * as tournamentEffects from '../store/effects/tournaments.effects';
import * as draftEffects from '../store/effects/draft.effects';
import * as matchEffects from '../store/effects/match.effects';
import { tournamentsReducer } from '../store/reducers/tournaments.reducer';
import { draftReducer } from '../store/reducers/draft.reducer';
import { matchReducer } from '../store/reducers/match.reducer';
import { CurrentDraftResolver } from '../_helpers/current-draft.resolver';

export const TOURNAMENT_ROUTES: Routes = [
  {
    path: '',
    component: MyTournamentsComponent,
    providers: [
      provideEffects(tournamentEffects),
      provideState('tournaments', tournamentsReducer),
      provideEffects(draftEffects),
      provideState('drafts', draftReducer),
      provideEffects(matchEffects),
      provideState('matches', matchReducer),
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
    resolve: { game: CurrentDraftResolver },
  },
];
