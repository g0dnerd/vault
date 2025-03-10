import { NgIf } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthAppState, selectAdminStatus, selectAuthStatus } from '../_store';
import { logout } from '../_store/actions/auth.actions';

@Component({
  selector: 'app-navbar',
  imports: [NgIf, PushPipe, RouterLink, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private readonly authStore$ = inject(Store<AuthAppState>);

  authState$: Observable<boolean> = this.authStore$.select(selectAuthStatus);
  isAdmin$ = this.authStore$.select(selectAdminStatus);

  logout() {
    this.authStore$.dispatch(logout());
  }
}
