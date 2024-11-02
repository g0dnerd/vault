import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  Component,
  inject,
  Input,
  numberAttribute,
  OnInit,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { PushPipe } from '@ngrx/component';
import { Observable, of, map, tap } from 'rxjs';

import { Draft, Match } from '@vault/shared';
import { matchSumValidator } from '../../_helpers/match-form.validator';
import { AlertService, MatchWebSocketService } from '../../_services';
import { DraftAppState, State, selectSelectedDraft } from '../../store';
import { selectDraft } from '../../store/actions/draft.actions';
import { updateMatch } from '../../store/actions/match.actions';

@Component({
  selector: 'app-admin-draft-card',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, PushPipe, ReactiveFormsModule],
  templateUrl: './admin-draft-card.component.html',
  styleUrl: './admin-draft-card.component.css',
})
export class AdminDraftCardComponent implements OnInit {
  private matchStore$ = inject(Store<State>);
  private matchWebSocketService = inject(MatchWebSocketService);
  private route = inject(ActivatedRoute);

  draft$: Observable<Draft | null> = of(null);
  matches$: Observable<Match[]> = of([]);

  // Result reporting and confirmation form
  form!: FormGroup;
  reportingFormArray: FormArray;

  loading = false;
  submitted = false;

  @Input({ transform: numberAttribute }) id = 0;

  constructor(
    private readonly draftStore$: Store<DraftAppState>,
    private formBuilder: FormBuilder,
    private readonly alertService: AlertService
  ) {
    this.matches$ = this.route.data.pipe(
      map((data) => data['games'] as Match[]),
      tap((games: Match[]) => {
        console.log('Clearing formArray');
        this.reportingFormArray.clear();
        games.forEach((game) => {
          console.log(`Adding ${JSON.stringify(game)} to formArray`);
          const gameForm = this.formBuilder.group(
            {
              matchId: [game.id],
              player1Wins: [
                0,
                [Validators.required, Validators.min(0), Validators.max(2)],
              ],
              player2Wins: [
                0,
                [Validators.required, Validators.min(0), Validators.max(2)],
              ],
            },
            { validators: matchSumValidator }
          );

          this.reportingFormArray.push(gameForm);
        });
      })
    );

    // Listen to the match WebSocket service and have it update matches
    // on the corresponding event
    this.matchWebSocketService
      .listenForMatchUpdates()
      .subscribe((game: Match) => {
        this.matchStore$.dispatch(
          updateMatch({ update: { id: game.id, changes: game } })
        );
      });

    this.reportingFormArray = this.formBuilder.array([]);
  }

  ngOnInit() {
    this.draftStore$.dispatch(selectDraft({ id: this.id }));
    this.draft$ = this.draftStore$.select(selectSelectedDraft);
  }

  getFormGroupForGame(index: number): FormGroup {
    return this.reportingFormArray.at(index) as FormGroup;
  }

  getGameControl(index: number, controlName: string) {
    return (this.reportingFormArray.at(index) as FormGroup).get(controlName);
  }

  async onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.form.invalid) return;
    this.loading = true;
  }
}
