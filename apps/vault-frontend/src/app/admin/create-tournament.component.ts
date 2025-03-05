import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { firstValueFrom } from 'rxjs';

import { AlertService, TournamentService } from '../_services';

@Component({
  selector: 'app-create-tournament',
  standalone: true,
  imports: [
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    NgClass,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './create-tournament.component.html',
  styleUrl: './create-tournament.component.css',
})
export class CreateTournamentComponent implements OnInit {
  tournamentCreated = output<void>();

  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private readonly tournamentService: TournamentService,
    private readonly alertService: AlertService,
    private readonly formBuilder: FormBuilder // private readonly router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      public: [false, Validators.required],
      league: [false, Validators.required],
      playerCapacity: [
        0,
        [Validators.required, Validators.pattern(/[0-9]{1,2}/)],
      ],
      description: ['', Validators.required],
    });

    this.form.setValue({
      name: 'New Tournament 1',
      public: false,
      league: false,
      playerCapacity: 32,
      description: 'Foo Bar',
    });
    this.loading = false;
  }

  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.form.invalid) return;

    this.loading = true;

    try {
      await firstValueFrom(
        this.tournamentService.createTournament({
          name: this.f['name'].value,
          public: this.f['public'].value,
          isLeague: this.f['league'].value,
          playerCapacity: this.f['playerCapacity'].value,
          description: this.f['description'].value,
        })
      );

      console.log('created tournament');
      this.alertService.success(
        `Tournament ${this.f['name'].value} created successfully`,
        true
      );

      // Reset form and state
      this.loading = false;
      this.submitted = false;
      this.form.reset();
    } catch (error) {
      this.alertService.error('Failed to create tournament');
      this.loading = false; // Ensure loading is reset on error
    }
  }
}
