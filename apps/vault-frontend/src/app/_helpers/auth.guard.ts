import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, first } from 'rxjs';

import { AuthAppState, selectAuthStatus } from '../store';

@Injectable({
  providedIn: 'root',
})
// Allows route access only if user is authenticated.
// Waits for the store to fully resolve auth status before
// allowing or disallowing route access.
export class AuthResolver implements Resolve<boolean> {
  constructor(private readonly authStore$: Store<AuthAppState>) {}

  resolve(): Observable<boolean> {
    return this.authStore$.select(selectAuthStatus).pipe(
      // Take the first value from the subscription that is a resolved auth status
      first((authStatus) => authStatus !== null),
      // and return it
      map((authStatus) => !!authStatus)
    );
  }
}

@Injectable({
  providedIn: 'root',
})
// Allows route access only if user is NOT authenticated.
// Waits for the store to fully resolve auth status before
// allowing or disallowing route access.
export class UnAuthResolver implements Resolve<boolean> {
  constructor(private readonly authStore$: Store<AuthAppState>) {}

  resolve(): Observable<boolean> {
    return this.authStore$.select(selectAuthStatus).pipe(
      // Take the first value from the subscription that is a resolved auth status
      first((authStatus) => authStatus !== null),
      // Return the inverse of that status
      map((authStatus) => !!!authStatus)
    );
  }
}
