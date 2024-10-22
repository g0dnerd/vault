import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { AlertComponent } from './alert/alert.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthAppState } from './store';
import { initAuth } from './store/actions/auth.actions';

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
export class AppComponent {
  constructor(private readonly store$: Store<AuthAppState>) {
    this.store$.dispatch(initAuth());
  }
}
