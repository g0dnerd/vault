import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

import { AccountService, AuthService } from '../../_services';
import * as AuthActions from '../actions/auth.actions';

export const refreshAuth = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(AuthActions.refreshAuth),
      mergeMap(() => {
        return authService.checkToken().pipe(
          map(({ token, isAdmin }) => {
            if (isAdmin == undefined) {
              isAdmin = false;
            }
            return AuthActions.authSuccess({
              token,
              isAdmin,
            });
          }),
          catchError(() => {
            return of(AuthActions.logout());
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
      tap(({ isAdmin, token, returnUrl }) => {
        localStorage.setItem('token', token);
        if (returnUrl) {
          if (isAdmin) {
            router.navigateByUrl('/');
          } else {
            router.navigate([returnUrl || '/']);
          }
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
          map(({ token, isAdmin }) => {
            if (!token)
              return AuthActions.loginFailure({ errorMessage: 'JWT error' });
            if (isAdmin == undefined) {
              isAdmin = false;
            }
            return AuthActions.authSuccess({
              token,
              isAdmin,
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
        router.navigateByUrl('/account/login');
      })
    );
  },
  { functional: true, dispatch: false }
);

export const initProfileEffect = createEffect(
  (actions$ = inject(Actions), accountService = inject(AccountService)) => {
    return actions$.pipe(
      ofType(AuthActions.initProfile),
      mergeMap(() => {
        return accountService.getUserProfile().pipe(
          map((user) => {
            return AuthActions.initProfileSuccess({ user });
          }),
          catchError((error) => {
            const errorMessage = error
              ? error[0]
              : `${AuthActions.updateUser.type} Error while updating user`;
            return of(AuthActions.initProfileFailure({ errorMessage }));
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);

export const initAdminStatusEffect = createEffect(
  (actions$ = inject(Actions), accountService = inject(AccountService)) => {
    return actions$.pipe(
      ofType(AuthActions.initAdminStatus),
      mergeMap(() => {
        return accountService.isCurrentUserAdmin().pipe(
          map((isAdmin) => {
            return AuthActions.initAdminStatusSuccess({ isAdmin });
          }),
          catchError((error) => {
            const errorMessage = error
              ? error[0]
              : `${AuthActions.updateUser.type} Error while updating user`;
            return of(AuthActions.initAdminStatusFailure({ errorMessage }));
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);

export const updateUserEffect = createEffect(
  (actions$ = inject(Actions), accountService = inject(AccountService)) => {
    return actions$.pipe(
      ofType(AuthActions.updateUser),
      mergeMap(({ email, username }) => {
        return accountService.updateUserProfile(username, email).pipe(
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
          map(({ token, isAdmin }) => {
            if (!token)
              return AuthActions.registerFailure({
                errorMessage: 'JWT error ',
              });
            if (isAdmin == undefined) {
              isAdmin = false;
            }
            router.navigate(['/']);
            return AuthActions.authSuccess({ token, isAdmin });
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
