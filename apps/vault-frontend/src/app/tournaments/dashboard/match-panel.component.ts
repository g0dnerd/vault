import { Component, inject, OnInit } from '@angular/core';
import { KeyValuePipe, NgClass, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Match } from '@vault/shared';
import {
  MatchWebSocketService,
  AlertService,
  MatchService,
} from '../../_services';
import { State, selectMatchById } from '../../store';
import { confirmResult, updateMatch } from '../../store/actions/match.actions';
import { matchSumValidator } from '../../_helpers/match-form.validator';

@Component({
  selector: 'app-match-panel',
  standalone: true,
  imports: [PushPipe, KeyValuePipe, ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './match-panel.component.html',
  styleUrl: './match-panel.component.css',
})
export class MatchPanelComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  private matchStore$ = inject(Store<State>);
  private matchWebSocketService = inject(MatchWebSocketService);
  private route = inject(ActivatedRoute);
  private matchId = this.route.snapshot.data['game'].id;
  currentMatch$: Observable<Match | undefined> = this.matchStore$.select(
    selectMatchById(this.matchId)
  );

  constructor(
    private formBuilder: FormBuilder,
    private readonly alertService: AlertService,
    private readonly matchService: MatchService
  ) {
    // Listen to the WebSocket service and
    // have it update matches on the corresponding event
    this.matchWebSocketService
      .listenForMatchUpdates()
      .subscribe((game: Match) => {
        this.matchStore$.dispatch(
          updateMatch({ update: { id: game.id, changes: game } })
        );
      });
  }

  ngOnInit() {
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
      { validators: matchSumValidator }
    );
    // Initial form values
    this.form.setValue({
      player1Wins: 0,
      player2Wins: 0,
    });
    this.loading = false;
  }

  get f() {
    return this.form.controls;
  }

  // Handles reporting form submission
  async onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.form.invalid) return;
    this.loading = true;

    const result =
      this.f['player1Wins'].value === this.f['player2Wins'].value
        ? 0
        : this.f['player1Wins'] > this.f['player2Wins']
        ? -1
        : 1;

    // TODO: Handle error responses
    this.matchService
      .reportResult(this.matchId, {
        player1Wins: this.f['player1Wins'].value,
        player2Wins: this.f['player2Wins'].value,
        result,
      })
      .subscribe();

    this.loading = false;
  }

  // Handles result confirmation
  onConfirm() {
    this.alertService.clear();

    if (this.form.invalid) return;

    // TODO: Use WebSocketService for this as well, handle error responses
    this.matchStore$.dispatch(confirmResult({ matchId: this.matchId }));

    this.loading = false;
  }
}
