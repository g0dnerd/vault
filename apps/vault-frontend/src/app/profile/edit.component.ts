import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgClass, NgIf } from '@angular/common';

import { AlertService } from '../_services';
import { User } from '@vault/shared';
import { AuthAppState, selectAuthUser } from '../store';
import { updateUser } from '../store/actions/auth.actions';
import { Observable, of } from 'rxjs';
import { PushPipe } from '@ngrx/component';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, RouterLink, PushPipe],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  user$: Observable<User | null> = of(null);

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private readonly store$: Store<AuthAppState>
  ) {}

  async ngOnInit() {
    this.user$ = this.store$.select(selectAuthUser);
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      id: ['', Validators.required],
    });
    this.user$.subscribe((user) => {
      this.form.setValue({
        username: user?.username,
        email: user?.email,
        id: user?.id,
      });
      console.log(JSON.stringify(user));
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.form.invalid) return;

    this.loading = true;
    this.store$.dispatch(
      updateUser({
        email: this.f['email'].value,
        username: this.f['username'].value,
        userId: this.f['id'].value,
      })
    );
  }
}
