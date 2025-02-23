import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

import { AccountService, AuthService } from '../../_services';
import * as AuthActions from '../actions/auth.actions';

export const initAuth = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(AuthActions.initAuth),
      mergeMap(() => {
        return authService.status().pipe(
          map(({ token, user }) => {
            user.token = token;
            return AuthActions.authSuccess({ authBlob: { token, user } });
          }),
          catchError(() => {
            return of(AuthActions.initAuthFailure());
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);

export const authSuccess = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(AuthActions.authSuccess),
      tap(({ authBlob, returnUrl }) => {
        localStorage.setItem('token', authBlob.token);
        if (returnUrl) {
          router.navigate([returnUrl || '/']);
        }
      })
    );
  },
  { functional: true, dispatch: false }
);

export const login = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ loginData, returnUrl }) => {
        return authService.login(loginData).pipe(
          map(({ token, user }) => {
            if (!token)
              return AuthActions.loginFailure({ errorMessage: 'JWT error' });
            user.token = token;
            return AuthActions.authSuccess({
              authBlob: { token, user },
              returnUrl,
            });
          }),
          catchError((error) => {
            const errorMessage = error
              ? `${AuthActions.login.type}: ${error[0]}`
              : `${AuthActions.login.type}: Got an unspecified error response while logging in`;
            return of(AuthActions.loginFailure({ errorMessage }));
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);

export const logout = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem('token');
        router.navigateByUrl('/');
      })
    );
  },
  { functional: true, dispatch: false }
);

export const updateUserEffect = createEffect(
  (actions$ = inject(Actions), accountService = inject(AccountService)) => {
    return actions$.pipe(
      ofType(AuthActions.updateUser),
      mergeMap(({ email, username, userId }) => {
        return accountService.updateUserProfile(username, email, userId).pipe(
          map((authBlob) => {
            return AuthActions.updateUserSuccess({ user: authBlob });
          }),
          catchError((error) => {
            const errorMessage = error
              ? error[0]
              : `${AuthActions.updateUser.type} Error while updating user`;
            return of(AuthActions.updateUserFailure({ errorMessage }));
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({ registerData }) => {
        return authService.register(registerData).pipe(
          map(({ user, token }) => {
            if (!token)
              return AuthActions.registerFailure({
                errorMessage: 'JWT error ',
              });
            user.token = token;
            router.navigate(['/']);
            return AuthActions.authSuccess({ authBlob: { user, token } });
          }),
          catchError((error) => {
            const errorMessage = error
              ? `${AuthActions.register.type} error[0]`
              : `${AuthActions.register.type} Error while registering`;
            return of(AuthActions.registerFailure({ errorMessage }));
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);
