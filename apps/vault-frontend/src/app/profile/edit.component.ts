import { NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '@vault/shared';
import { AlertService } from '../_services';
import { AuthAppState, selectProfileData } from '../_store';
import { updateUser } from '../_store/actions/auth.actions';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, RouterLink, PushPipe],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  private readonly store$ = inject(Store<AuthAppState>);

  user$: Observable<User | null> = this.store$.select(selectProfileData);

  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {}

  async ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.user$.subscribe((user) => {
      this.form.setValue({
        username: user?.username,
        email: user?.email,
      });
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
      })
    );
  }
}
