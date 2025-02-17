import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';

import { login } from '../_store/actions/auth.actions';
import { AuthAppState } from '../_store';

@Component({
  templateUrl: 'login.component.html',
  imports: [ReactiveFormsModule, NgClass, NgIf, RouterLink],
  standalone: true,
})
export class LoginComponent implements OnInit {
  errorMessage: string | null = null;
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private readonly store$: Store<AuthAppState>,
    private route: ActivatedRoute
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

    this.store$.dispatch(
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
