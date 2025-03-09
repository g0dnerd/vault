import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';

import { appRoutes } from './app.routes';
import {
  AuthGuard,
  errorInterceptor,
  jwtInterceptor,
  UnAuthGuard,
} from './_helpers';
import * as authEffects from './_store/effects/auth.effects';
import * as cubeEffects from './_store/effects/cube.effects';
import { authReducer } from './_store/reducers/auth.reducer';
import { cubeReducer } from './_store/reducers/cube.reducer';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { dev } from '../environments/environment';

const config: SocketIoConfig = {
  url: dev.webSocketUrl,
  options: {
    transports: ['websocket'],
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    AuthGuard,
    UnAuthGuard,
    provideStore(),
    provideState({ name: 'auth', reducer: authReducer }),
    provideEffects(authEffects),
    provideState({ name: 'cubes', reducer: cubeReducer }),
    provideEffects(cubeEffects),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(
      withFetch(),
      withInterceptors([jwtInterceptor, errorInterceptor])
    ),
    importProvidersFrom(SocketIoModule.forRoot(config)),
    provideAnimationsAsync(),
  ],
};
