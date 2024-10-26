import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withComponentInputBinding,
  // withEnabledBlockingInitialNavigation,
} from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';

import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import {
  AuthGuard,
  errorInterceptor,
  jwtInterceptor,
  UnAuthGuard,
} from './app/_helpers';
import * as authEffects from './app/store/effects/auth.effects';
import { authReducer } from './app/store/reducers/auth.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    AuthGuard,
    UnAuthGuard,
    provideStore(),
    provideState({ name: 'auth', reducer: authReducer }),
    provideEffects(authEffects),
    provideRouter(
      appRoutes,
      // withEnabledBlockingInitialNavigation(),
      withComponentInputBinding()
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([jwtInterceptor, errorInterceptor])
    ),
  ],
}).catch((err) => console.error(err));
