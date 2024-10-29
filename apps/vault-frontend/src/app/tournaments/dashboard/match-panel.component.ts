import {
  Component,
  inject,
  Input,
  numberAttribute,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { KeyValuePipe, NgClass, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { Match } from '@vault/shared';
import { MatchWebSocketService, AlertService } from '../../_services';
import { State, selectMatchById } from '../../store';
import {
  confirmResult,
  reportResult,
  updateMatch,
} from '../../store/actions/match.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-match-panel',
  standalone: true,
  imports: [PushPipe, KeyValuePipe, ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './match-panel.component.html',
  styleUrl: './match-panel.component.css',
})
export class MatchPanelComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  loading = false;
  submitted = false;

  private matchStore$ = inject(Store<State>);
  private matchWebSocketService = inject(MatchWebSocketService);
  currentMatch$: Observable<Match | undefined> = this.matchStore$.select(
    selectMatchById(1)
  );

  @Input({ transform: numberAttribute }) tournamentId = 0;

  constructor(
    private formBuilder: FormBuilder,
    private readonly alertService: AlertService
  ) {
    // Listen to the WebSocket service
    this.matchWebSocketService
      .listenForMatchUpdates()
      .subscribe((game: Match) => {
        console.log('Received matchUpdated event from socket');
        this.matchStore$.dispatch(
          updateMatch({ update: { id: game.id, changes: game } })
        );
      });

    // Initialize result reporting form
    this.form = this.formBuilder.group({
      player1Wins: [
        0,
        [Validators.required, Validators.min(0), Validators.max(2)],
      ],
      player2Wins: [
        0,
        [Validators.required, Validators.min(0), Validators.max(2)],
      ],
    });
  }

  ngOnInit() {
    // Initialize the WebSocket connection
    this.matchWebSocketService.connectSocket('test');

    // Initial form values
    this.form.setValue({
      player1Wins: 0,
      player2Wins: 0,
    });
    this.loading = false;
  }

  ngOnDestroy() {
    this.matchWebSocketService.disconnectSocket();
  }

  get f() {
    return this.form.controls;
  }

  // Handles reporting form submission
  onSubmit() {
    this.alertService.clear();

    if (this.form.invalid) return;

    // TODO: implement this
    const matchId = 1;

    const result =
      this.f['player1Wins'].value === this.f['player2Wins'].value
        ? 0
        : this.f['player1Wins'] > this.f['player2Wins']
        ? -1
        : 1;

    // TODO: Handle error responses
    this.matchStore$.dispatch(
      reportResult({
        matchId,
        result: {
          player1Wins: this.f['player1Wins'].value,
          player2Wins: this.f['player2Wins'].value,
          result,
        },
      })
    );

    this.loading = false;
  }

  // Handles result confirmation
  onConfirm() {
    this.alertService.clear();

    if (this.form.invalid) return;

    // TODO: implement this
    const matchId = 1;

    // TODO: Handle error responses
    this.matchStore$.dispatch(confirmResult({ matchId }));

    this.loading = false;
  }
}
