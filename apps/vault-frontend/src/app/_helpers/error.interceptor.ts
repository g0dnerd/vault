import { HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, throwError, catchError } from 'rxjs';

import { AuthAppState } from '../_store';
import { logout } from '../_store/actions/auth.actions';

export function errorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const router = inject(Router);
  const authStore$ = inject(Store<AuthAppState>);

  return next(req).pipe(
    catchError((err) => {
      if ([401, 403].includes(err.status)) {
        console.log(router.url);
        authStore$.dispatch(logout());
        router.navigateByUrl('/account/login');
      }

      const error = err.error?.message || err.statusText;
      return throwError(() => error);
    })
  );
}
