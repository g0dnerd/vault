import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthAppState, selectAuthStatus } from '../store';
import { Observable, map, first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthResolver implements Resolve<boolean> {
  constructor(private readonly authStore$: Store<AuthAppState>) {}

  resolve(): Observable<boolean> {
    return this.authStore$.select(selectAuthStatus).pipe(
      first((authStatus) => authStatus !== null),
      map((authStatus) => !!authStatus)
    );
  }
}

@Injectable({
  providedIn: 'root',
})
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
