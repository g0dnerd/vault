import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { AuthResolver } from '../_helpers';
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
      provideState('match', matchReducer),
    ],
    resolve: { auth: AuthResolver },
    data: { requiredRole: Role.Player },
  },
  {
    path: 'available',
    component: AvailableTournamentsComponent,
    resolve: { auth: AuthResolver },
    data: { requiredRole: Role.Player },
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    resolve: { auth: AuthResolver },
    data: { requiredRole: Role.Admin },
  },
  {
    path: 'admin/:id',
    component: AdminTournamentDashboardComponent,
    resolve: { auth: AuthResolver },
    data: { requiredRole: Role.Admin },
  },
  {
    path: ':id',
    component: TournamentDashboardComponent,
    resolve: { auth: AuthResolver },
  },
];
