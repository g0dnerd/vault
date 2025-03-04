import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import {
  AuthGuard,
  errorInterceptor,
  jwtInterceptor,
  UnAuthGuard,
} from './app/_helpers';
import * as authEffects from './app/_store/effects/auth.effects';
import * as cubeEffects from './app/_store/effects/cube.effects';
import { authReducer } from './app/_store/reducers/auth.reducer';
import { cubeReducer } from './app/_store/reducers/cube.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    AuthGuard,
    UnAuthGuard,
    provideStore(),
    provideState({ name: 'auth', reducer: authReducer }),
    provideEffects(authEffects),
    provideState('cubes', cubeReducer),
    provideEffects(cubeEffects),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(
      withFetch(),
      withInterceptors([jwtInterceptor, errorInterceptor])
    ),
    provideAnimationsAsync(),
  ],
}).catch((err) => console.error(err));
