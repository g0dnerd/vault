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

import { Match } from '@vault/shared';
import {
  MatchWebSocketService,
  AlertService,
  MatchService,
} from '../../_services';
import {
  AuthAppState,
  State,
  selectMatchByQuery,
  selectUsername,
} from '../../_store';
import { updateMatch } from '../../_store/actions/match.actions';
import { ReportResultFormComponent } from '../report-result-form/report-result-form.component';
import { initProfile } from '../../_store/actions/auth.actions';

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

  private readonly authStore$ = inject(Store<AuthAppState>);
  private readonly store$ = inject(Store<State>);
  private readonly matchWebSocketService = inject(MatchWebSocketService);

  loading = false;

  currentMatch$: Observable<Match | undefined> = of(undefined);
  username$: Observable<string | undefined> =
    this.authStore$.select(selectUsername);
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
    this.authStore$.dispatch(initProfile());
    this.username$.subscribe((username) => {
      if (username) {
        this.currentMatch$ = this.store$
          .select(
            selectMatchByQuery(
              (game) =>
                game.player1?.enrollment?.user?.username == username ||
                game.player2?.enrollment?.user?.username == username
            )
          )
          .pipe(filter((game): game is Match => game != undefined));
      }
    });
    this.opponentName$ = combineLatest([
      this.currentMatch$,
      this.username$,
    ]).pipe(
      map(([game, username]) => {
        const p1 = game?.player1?.enrollment?.user.username;
        const p2 = game?.player2?.enrollment?.user.username;

        // Determine the opponent's name
        return username === p1 ? p2 : p1;
      })
    );
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
