import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';

import { register } from '../store/actions/auth.actions';
import { AuthAppState, selectErrorMessage } from '../store';
import { AuthPayload } from '@vault/shared';
import { AlertService } from '../_services';
import { Observable, of } from 'rxjs';

@Component({
  templateUrl: 'register.component.html',
  imports: [ReactiveFormsModule, NgClass, NgIf, RouterLink],
  standalone: true,
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  errorMessage$: Observable<string | null> = of(null);

  constructor(
    private formBuilder: FormBuilder,
    private readonly store$: Store<AuthAppState>,
    private readonly alertService: AlertService
  ) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
    this.errorMessage$ = this.store$.select(selectErrorMessage);

    // Subscribe to error messages from the registration process
    // and pipe them into the alert service
    this.errorMessage$.subscribe((msg) => {
      if (msg) {
        this.alertService.error(msg, true);
      }
    });
    this.loading = false;
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.form.invalid) return;

    this.loading = true;

    const registerData: AuthPayload = {
      email: this.f['email'].value,
      username: this.f['username'].value,
      password: this.f['password'].value,
    };

    this.store$.dispatch(register({ registerData }));
    this.loading = false;
  }
}
