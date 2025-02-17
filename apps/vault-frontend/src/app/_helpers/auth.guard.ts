import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, first } from 'rxjs';

import { AuthAppState, selectAuthStatus } from '../_store';

@Injectable({
  providedIn: 'root',
})
// Allows route access only if user is authenticated.
// Waits for the store to fully resolve auth status before
// allowing or disallowing route access.
export class AuthGuard implements CanActivate {
  constructor(private readonly authStore$: Store<AuthAppState>) {}

  canActivate() {
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
export class UnAuthGuard implements CanActivate {
  constructor(private readonly authStore$: Store<AuthAppState>) {}

  canActivate() {
    return this.authStore$.select(selectAuthStatus).pipe(
      // Take the first value from the subscription that is a resolved auth status
      first((authStatus) => authStatus !== null),
      // Return the inverse of that status
      map((authStatus) => !!!authStatus)
    );
  }
}
