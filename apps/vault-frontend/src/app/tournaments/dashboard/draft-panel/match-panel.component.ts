import { Component, inject, signal } from '@angular/core';
import { KeyValuePipe, NgClass, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';

import { Match } from '@vault/shared';
import {
  MatchWebSocketService,
  AlertService,
  MatchService,
} from '../../../_services';
import {
  AuthAppState,
  MatchAppState,
  selectCurrentMatch,
  selectUsername,
} from '../../../_store';
import { updateCurrentMatch } from '../../../_store/actions/match.actions';
import { ReportResultFormComponent } from '../../report-result-form/report-result-form.component';

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
export class MatchPanelComponent {
  private readonly authStore$ = inject(Store<AuthAppState>);
  private readonly matchStore$ = inject(Store<MatchAppState>);
  private readonly matchWebSocketService = inject(MatchWebSocketService);

  loading = false;
  result = signal(-1);

  currentMatch$: Observable<Match | null> =
    this.matchStore$.select(selectCurrentMatch);
  username$: Observable<string | undefined> =
    this.authStore$.select(selectUsername);

  constructor(
    private readonly alertService: AlertService,
    private readonly matchService: MatchService
  ) {
    // Listen to the WebSocket service and
    // have it update matches on the corresponding event
    this.matchWebSocketService
      .listenForMatchUpdates()
      .subscribe((game: Match) => {
        this.matchStore$.dispatch(updateCurrentMatch({ changes: game }));
      });
    this.currentMatch$.subscribe((game) => {
      if (game) {
        const result =
          game.player1Wins > game.player2Wins
            ? 1
            : game.player2Wins > game.player1Wins
            ? 2
            : 0;
        this.result.set(result);
      }
    });
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
