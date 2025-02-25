import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AlertService } from '../../_services';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, RouterLink],
  selector: 'app-tournament-register-panel',
  templateUrl: './register-panel.component.html',
  styleUrl: './register-panel.component.css',
})
export class RegisterPanelComponent implements OnInit {
  @Input({ required: true }) tournamentId: number | undefined = 0;
  @Input({ required: true }) tournamentName = '';
  @Input({ required: true }) tournamentCapacity = 0;
  @Output() registerTournament = new EventEmitter();

  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      tournamentId: [this.tournamentId, Validators.required],
    });
    this.loading = false;
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.form.invalid || !this.tournamentId) {
      // TODO: Give this a proper feedback message
      this.alertService.error(`Invalid registration form.`);
      return;
    }

    this.loading = true;
    this.registerTournament.emit({
      tournamentId: this.tournamentId,
    });
    this.loading = false;
  }
}
