import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '@vault/shared';
import { AuthAppState, selectAdminStatus, selectProfileData } from '../_store';
import { initAdminStatus, initProfile } from '../_store/actions/auth.actions';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    NgIf,
    PushPipe,
    RouterLink,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  private readonly authStore$ = inject(Store<AuthAppState>);

  user$: Observable<User | null> = this.authStore$.select(selectProfileData);
  isAdmin$: Observable<boolean | null> =
    this.authStore$.select(selectAdminStatus);

  ngOnInit() {
    this.authStore$.dispatch(initProfile());
    this.authStore$.dispatch(initAdminStatus());
  }
}
