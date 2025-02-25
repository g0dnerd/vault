import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PushPipe } from '@ngrx/component';

import { AlertComponent } from './alert/alert.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Store } from '@ngrx/store';
import { AuthAppState } from './_store';
import { logout, refreshAuth } from './_store/actions/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    AlertComponent,
    NavbarComponent,
    PushPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly authStore$: Store<AuthAppState>,
    private readonly router: Router
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token == null) {
      this.authStore$.dispatch(logout());
      this.router.navigateByUrl('/account/login');
    } else {
      this.authStore$.dispatch(refreshAuth());
    }
  }
}
