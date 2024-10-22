import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { NgClass, NgIf } from '@angular/common';

import { AlertService, TournamentService } from '../_services';

@Component({
  selector: 'app-create-tournament',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './create-tournament.component.html',
  styleUrl: './create-tournament.component.css',
})
export class CreateTournamentComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private readonly tournamentService: TournamentService,
    private readonly alertService: AlertService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      public: [false, Validators.required],
      playerCapacity: [
        0,
        [Validators.required, Validators.pattern(/[0-9]{1,2}/)],
      ],
      description: ['', Validators.required],
    });

    this.form.setValue({
      name: 'New Tournament 1',
      public: false,
      playerCapacity: 32,
      description: 'Foo Bar',
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

    // TODO: Refactor this to use tournament actions
    this.tournamentService
      .createTournament({
        name: this.f['name'].value,
        public: this.f['public'].value,
        playerCapacity: this.f['playerCapacity'].value,
        description: this.f['description'].value,
      })
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success(
            `Tournament ${this.f['name'].value} created successfully`,
            true
          );
          this.router.navigateByUrl(this.router.url, {
            skipLocationChange: false,
          });
        },
        error: (error) => {
          this.alertService.error(error);
          this.loading = false;
        },
      });
  }
}
