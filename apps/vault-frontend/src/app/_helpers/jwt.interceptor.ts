import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

import { AuthAppState, selectAuthToken } from '../_store';

// Intercepts any outgoing HTTP request and inserts the JWT token
// into the `Authorization` header
export function jwtInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authStore$ = inject(Store<AuthAppState>);
  let accessToken = authStore$.select(selectAuthToken).pipe(take(1));

  accessToken.subscribe((token) => {
    if (!token) {
      token = localStorage['token'];
    }
    if (token) {
      req = req.clone({
        setHeaders: {
          // NOTE: without the RegEx, the quotation marks (") kept getting inserted
          // into the header, I'm not sure why. I don't love this, but it works.
          Authorization: `Bearer ${token?.replace(/"/g, '')}`,
          Content: 'application/json',
        },
      });
    }
  });
  return next(req);
}
