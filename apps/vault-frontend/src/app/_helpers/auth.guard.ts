import { inject, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { AuthAppState, selectAuthToken } from '../_store';

@Injectable({
  providedIn: 'root',
})
// Allows route access only if user is authenticated.
// Waits for the store to fully resolve auth status before
// allowing or disallowing route access.
export class AuthGuard implements CanActivate {
  constructor(private readonly authStore$: Store<AuthAppState>) {}

  canActivate() {
    return this.authStore$.select(selectAuthToken).pipe(
      // Take the first value from the subscription and return it
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
  private readonly authStore$ = inject(Store<AuthAppState>);

  canActivate() {
    return this.authStore$.select(selectAuthToken).pipe(
      // Take the first value from the subscription that is a resolved auth status
      // Return the inverse of that status
      map((authToken) => {
        return !!!authToken;
      })
    );
  }
}
