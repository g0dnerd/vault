import { Route } from '@angular/router';

import { LoginComponent, RegisterComponent } from './account';
import { AuthResolver, UnAuthResolver } from './_helpers';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './profile/edit.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent, resolve: { auth: AuthResolver } },
  {
    path: 'account/login',
    component: LoginComponent,
    resolve: {
      auth: UnAuthResolver,
    },
  },
  {
    path: 'account/register',
    component: RegisterComponent,
    resolve: {
      auth: UnAuthResolver,
    },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    resolve: {
      auth: AuthResolver,
    },
  },
  {
    path: 'profile/edit',
    component: EditComponent,
    resolve: {
      auth: AuthResolver,
    },
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
