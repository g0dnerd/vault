import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { Role } from '@vault/shared';
import { AvailableTournamentsComponent } from './available-tournaments';
import { MyTournamentsComponent } from './my-tournaments';
import { TournamentDashboardComponent } from './dashboard/tournament-dashboard.component';
import { AdminDashboardComponent } from '../admin/admin-dashboard.component';
import { AdminTournamentDashboardComponent } from '../admin/admin-tournament-dashboard.component';
import { LeaguesHomeComponent } from '../leagues/leagues-home.component';
import * as draftEffects from '../_store/effects/draft.effects';
import * as enrollmentEffects from '../_store/effects/enrollment.effects';
import * as imageEffects from '../_store/effects/image.effects';
import * as matchEffects from '../_store/effects/match.effects';
import * as tournamentEffects from '../_store/effects/tournaments.effects';
import { draftReducer } from '../_store/reducers/draft.reducer';
import { enrollmentReducer } from '../_store/reducers/enrollment.reducer';
import { imageReducer } from '../_store/reducers/image.reducer';
import { matchReducer } from '../_store/reducers/match.reducer';
import { tournamentReducer } from '../_store/reducers/tournaments.reducer';

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
      provideEffects(enrollmentEffects),
      provideState('enrollments', enrollmentReducer),
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
    path: 'admin/:id',
    component: AdminTournamentDashboardComponent,
    data: { requiredRole: Role.Admin },
  },
  {
    path: ':tournamentId',
    component: TournamentDashboardComponent,
  },
];
