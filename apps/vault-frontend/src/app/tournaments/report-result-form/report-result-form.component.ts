import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { MatchService } from '../../_services';
import { matchSumValidator } from '../../_helpers/match-form.validator';

@Component({
  selector: 'app-report-result-form',
  standalone: true,
  imports: [MatButtonToggleModule, ReactiveFormsModule, NgClass, NgIf, NgFor],
  templateUrl: './report-result-form.component.html',
  styleUrl: './report-result-form.component.css',
})
export class ReportResultFormComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  @Input({ transform: numberAttribute }) id = 0;
  @Input() p1name: string | undefined = '';
  @Input() p2name: string | undefined = '';
  @Input({ transform: numberAttribute }) userId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private readonly matchService: MatchService
  ) {
    // Initialize result reporting form
    this.form = this.formBuilder.group(
      {
        player1Wins: new FormControl(0, [
          Validators.required,
          Validators.min(0),
          Validators.max(2),
        ]),
        player2Wins: new FormControl(0, [
          Validators.required,
          Validators.min(0),
          Validators.max(2),
        ]),
      },
      // Ensure total number of games reported is not greater than 3
      { validators: matchSumValidator }
    );
  }

  ngOnInit() {
    // Initial form values
    this.form.setValue({
      player1Wins: 0,
      player2Wins: 0,
    });
  }

  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    this.submitted = true;
    // this.alertService.clear();

    if (this.form.invalid) return;
    this.loading = true;

    // Set the `result` field, where
    // -1: p1 wins, 0: draw, 1: p2 wins
    const result =
      this.f['player1Wins'].value === this.f['player2Wins'].value
        ? 0
        : this.f['player1Wins'] > this.f['player2Wins']
        ? -1
        : 1;

    await firstValueFrom(
      this.matchService.reportResult(this.userId, this.id, {
        player1Wins: this.f['player1Wins'].value,
        player2Wins: this.f['player2Wins'].value,
        result,
      })
    );
    this.loading = false;
  }
}
