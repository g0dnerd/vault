import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthAppState, selectAdminStatus, selectAuthStatus } from '../store';
import { logout } from '../store/actions/auth.actions';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  authState$: Observable<boolean | null> = of(null);
  isAdmin$: Observable<boolean | undefined> = of(false);

  constructor(private readonly store$: Store<AuthAppState>) {}

  ngOnInit() {
    this.authState$ = this.store$.select(selectAuthStatus);
    this.isAdmin$ = this.store$.select(selectAdminStatus);
  }

  logout() {
    this.store$.dispatch(logout());
  }
}
