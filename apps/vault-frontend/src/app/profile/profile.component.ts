import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { PushPipe } from '@ngrx/component';
import { Observable, of } from 'rxjs';
import { User } from '@vault/shared';
import { AuthAppState, selectAdminStatus, selectAuthUser } from '../store';

@Component({
  templateUrl: 'profile.component.html',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule, CommonModule, PushPipe],
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user$: Observable<User | null> = of(null);
  isAdmin$: Observable<boolean | undefined> = of(false);

  constructor(private readonly store$: Store<AuthAppState>) {}

  ngOnInit(): void {
    this.user$ = this.store$.select(selectAuthUser);
    this.isAdmin$ = this.store$.select(selectAdminStatus);
  }
}
