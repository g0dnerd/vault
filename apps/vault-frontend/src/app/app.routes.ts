import { Route } from '@angular/router';

import { LoginComponent, RegisterComponent } from './account';
import { AuthGuard, UnAuthGuard } from './_helpers';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './profile/edit.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'account/login',
    component: LoginComponent,
    canActivate: [UnAuthGuard],
  },
  {
    path: 'account/register',
    component: RegisterComponent,
    canActivate: [UnAuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/edit',
    component: EditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tournaments',
    loadChildren: () =>
      import('./tournaments/tournaments.routes').then(
        (m) => m.TOURNAMENT_ROUTES
      ),
  },
  { path: '**', redirectTo: '' },
];
