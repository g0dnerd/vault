import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable, of } from 'rxjs';

import { Draft, Match } from '@vault/shared';
import {
  DraftAppState,
  MatchAppState,
  selectCurrentDraft,
  selectOngoingMatches,
} from '../../_store';
import { initSingleDraft, seatDraft } from '../../_store/actions/draft.actions';
import {
  initDraftMatches,
  pairRound,
  updateDraftMatch,
} from '../../_store/actions/match.actions';
import { matchSumValidator } from '../../_helpers/match-form.validator';
import { MatchService, MatchWebSocketService } from '../../_services';

@Component({
  selector: 'app-admin-draft-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatExpansionModule,
    PushPipe,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './admin-draft-panel.component.html',
  styleUrl: './admin-draft-panel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDraftPanelComponent implements OnInit {
  draftId = input.required<number>();

  form: FormGroup;
  loading = false;
  submitted = false;

  private readonly draftStore$ = inject(Store<DraftAppState>);
  private readonly matchStore$ = inject(Store<MatchAppState>);

  draft$: Observable<Draft | null> = of(null);
  matches$: Observable<Match[]> = of([]);

  constructor(
    private formBuilder: FormBuilder,
    private readonly matchService: MatchService,
    private readonly matchWebSocketService: MatchWebSocketService
  ) {
    this.matchWebSocketService
      .listenForMatchUpdates()
      .subscribe((game: Match) => {
        this.matchStore$.dispatch(updateDraftMatch({ changes: game }));
      });
    this.form = this.formBuilder.group(
      {
        matchId: new FormControl(0, [Validators.required, Validators.min(0)]),
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
  }

  ngOnInit() {
    this.form.setValue({
      matchId: 0,
      player1Wins: 0,
      player2Wins: 0,
    });

    this.draftStore$.dispatch(initSingleDraft({ draftId: this.draftId() }));
    this.matchStore$.dispatch(initDraftMatches({ draftId: this.draftId() }));
    this.draft$ = this.draftStore$.select(selectCurrentDraft);
    this.matches$ = this.matchStore$.select(selectOngoingMatches);
  }

  get f() {
    return this.form.controls;
  }

  pairRound() {
    this.matchStore$.dispatch(pairRound({ draftId: this.draftId() }));
  }

  seatDraft() {
    this.draftStore$.dispatch(seatDraft({ draftId: this.draftId() }));
  }

  async reportResult(matchId: number) {
    this.submitted = true;

    if (this.form.invalid) return;
    this.loading = true;

    await firstValueFrom(
      this.matchService.reportResult(matchId, {
        player1Wins: this.f['player1Wins'].value,
        player2Wins: this.f['player2Wins'].value,
      })
    );
    this.loading = false;
  }

  async confirmResult(matchId: number) {
    console.log(matchId);
  }
}
