import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { login } from '../_store/actions/auth.actions';
import { AuthAppState } from '../_store';

@Component({
  imports: [NgClass, NgIf, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  errorMessage: string | null = null;
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private readonly authStore$: Store<AuthAppState>,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.loading = false;
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    this.loading = true;

    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.authStore$.dispatch(
      login({
        loginData: {
          email: this.f['username'].value,
          password: this.f['password'].value,
        },
        returnUrl,
      })
    );
  }
}
