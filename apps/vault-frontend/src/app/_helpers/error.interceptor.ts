import { HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';

export function errorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const router = inject(Router);
  return next(req).pipe(
    catchError((err) => {
      if ([401, 403].includes(err.status)) {
        localStorage.removeItem('token');
        router.navigateByUrl('/account/login');
      }

      const error = err.error?.message || err.statusText;
      return throwError(() => error);
    })
  );
}
