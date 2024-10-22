import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { KeyValuePipe, NgClass, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { PushPipe } from '@ngrx/component';

import { MatchState, selectCurrentMatch, selectCurrentMatchId } from '../../store';
import { initCurrent, reportResult } from '../../store/actions/match.actions';
import { AlertService } from '../../_services';
import { Match } from '@vault/shared';

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
  currentMatch$: Observable<Match | null> = of(null);

  constructor(
    private formBuilder: FormBuilder,
    private readonly matchStore$: Store<MatchState>,
    private readonly alertService: AlertService,
  ) {
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

  @Input({ transform: numberAttribute }) tournamentId = 0;

  async ngOnInit() {
    // Initialize result reporting form

    this.matchStore$.dispatch(initCurrent({ tournamentId: this.tournamentId }));
    this.currentMatch$ = this.matchStore$.select(selectCurrentMatch);

    this.form.setValue({
      player1Wins: 0,
      player2Wins: 0,
    });

    this.loading = false;
  }
  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    this.alertService.clear();

    if (this.form.invalid) return;

    const mId$ = this.matchStore$.select(selectCurrentMatchId);
    const matchId = await firstValueFrom(mId$);
    console.log(matchId);

    const result = this.f['player1Wins'].value === this.f['player2Wins'].value ? 0 : this.f['player1Wins'] > this.f['player2Wins'] ? -1 : 1;
    this.matchStore$.dispatch(reportResult({
      result: {
        player1Wins: this.f['player1Wins'].value,
        player2Wins: this.f['player2Wins'].value,
        matchId,
        result,
      }
    }));
    this.loading = false;

    this.currentMatch$.subscribe((game) => {
      console.log(JSON.stringify(game));
    })
  }

  onConfirm() {
    // TODO: Result confirmation service
    console.log("foo");
  }
}
