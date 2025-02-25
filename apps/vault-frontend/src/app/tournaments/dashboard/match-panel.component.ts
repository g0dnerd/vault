import {
  Component,
  inject,
  Input,
  numberAttribute,
  OnInit,
} from '@angular/core';
import { KeyValuePipe, NgClass, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  filter,
  firstValueFrom,
  map,
  Observable,
  of,
} from 'rxjs';

import { Match, User } from '@vault/shared';
import {
  MatchWebSocketService,
  AlertService,
  MatchService,
} from '../../_services';
import { AuthAppState, State, selectMatchByQuery } from '../../_store';
import {
  initializeMatchesForDraft,
  updateMatch,
} from '../../_store/actions/match.actions';
import { ReportResultFormComponent } from '../report-result-form/report-result-form.component';

@Component({
  selector: 'app-match-panel',
  standalone: true,
  imports: [
    ReportResultFormComponent,
    PushPipe,
    KeyValuePipe,
    ReactiveFormsModule,
    NgClass,
    NgIf,
  ],
  templateUrl: './match-panel.component.html',
  styleUrl: './match-panel.component.css',
})
export class MatchPanelComponent implements OnInit {
  @Input({ required: true, transform: numberAttribute }) id = 0;

  private store$ = inject(Store<State>);
  private matchWebSocketService = inject(MatchWebSocketService);

  loading = false;

  currentMatch$: Observable<Match | undefined> = of(undefined);
  // Observable for the opponent's name
  opponentName$: Observable<string | undefined> = of(undefined);

  constructor(
    private readonly alertService: AlertService,
    private readonly matchService: MatchService
  ) {
    // Listen to the WebSocket service and
    // have it update matches on the corresponding event
    this.matchWebSocketService
      .listenForMatchUpdates()
      .subscribe((game: Match) => {
        this.store$.dispatch(
          updateMatch({ update: { id: game.id, changes: game } })
        );
      });
  }

  ngOnInit() {
    this.store$.dispatch(initializeMatchesForDraft({ draftId: this.id }));
    // this.user$.subscribe((user) => {
    //   if (user) {
    //     this.currentMatch$ = this.store$
    //       .select(
    //         selectMatchByQuery(
    //           (game) =>
    //             game.round?.draftId == this.id &&
    //             (game.player1?.enrollment?.userId == user.id ||
    //               game.player2?.enrollment?.userId == user.id)
    //         )
    //       )
    //       .pipe(filter((game): game is Match => game != undefined));
    //   }
    // });
    // this.opponentName$ = combineLatest([this.currentMatch$, this.user$]).pipe(
    //   map(([game, user]) => {
    //     const p1 = game?.player1?.enrollment?.user.username;
    //     const p2 = game?.player2?.enrollment?.user.username;
    //
    //     // Determine the opponent's name
    //     return user?.username === p1 ? p2 : p1;
    //   })
    // );
  }

  // Handles result confirmation
  async onConfirm() {
    this.alertService.clear();

    const game = await firstValueFrom(this.currentMatch$);
    if (!game) {
      this.alertService.error(
        'Error while trying to confirm result (no game data)',
        true
      );
      return;
    }
    await firstValueFrom(this.matchService.confirmResult(game.id));
  }
}
