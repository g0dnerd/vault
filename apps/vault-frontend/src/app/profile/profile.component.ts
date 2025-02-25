import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { PushPipe } from '@ngrx/component';
import { Observable, of } from 'rxjs';

import { User } from '@vault/shared';
import { AuthAppState, selectProfileData } from '../_store';
import { initProfile } from '../_store/actions/auth.actions';

@Component({
  templateUrl: 'profile.component.html',
  standalone: true,
  imports: [NgIf, RouterLink, PushPipe],
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  private readonly store$ = inject(Store<AuthAppState>);

  user$: Observable<User | null> = this.store$.select(selectProfileData);
  isAdmin$: Observable<boolean | undefined> = of(false);

  ngOnInit() {
    this.store$.dispatch(initProfile());
  }
}
