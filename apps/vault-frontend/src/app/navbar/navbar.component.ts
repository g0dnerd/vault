import { PushPipe } from '@ngrx/component';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthAppState, selectAdminStatus, selectAuthStatus } from '../_store';
import { logout } from '../_store/actions/auth.actions';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, PushPipe, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly store$ = inject(Store<AuthAppState>);

  authState$: Observable<boolean> = this.store$.select(selectAuthStatus);
  isAdmin$: Observable<boolean | undefined> =
    this.store$.select(selectAdminStatus);

  logout() {
    this.store$.dispatch(logout());
  }
}
