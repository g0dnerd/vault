import { Component, inject } from '@angular/core';
import { KeyValuePipe, NgClass, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { combineLatest, firstValueFrom, map, Observable } from 'rxjs';

import { Match, User } from '@vault/shared';
import {
  MatchWebSocketService,
  AlertService,
  MatchService,
} from '../../_services';
import {
  AuthAppState,
  State,
  selectAuthUser,
  selectMatchById,
} from '../../store';
import { updateMatch } from '../../store/actions/match.actions';
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
export class MatchPanelComponent {
  private authStore$ = inject(Store<AuthAppState>);
  private matchStore$ = inject(Store<State>);
  private matchWebSocketService = inject(MatchWebSocketService);
  private route = inject(ActivatedRoute);
  loading = false;

  // Get the current match ID from the route resolver
  private matchId = this.route.snapshot.data['game'].id;

  // Subscribe to that match in NGRX
  currentMatch$: Observable<Match | undefined> = this.matchStore$.select(
    selectMatchById(this.matchId)
  );
  user$: Observable<User | null> = this.authStore$.select(selectAuthUser);

  // Observable for the opponent's name
  opponentName$: Observable<string | undefined> = combineLatest([
    this.currentMatch$,
    this.user$,
  ]).pipe(
    map(([game, user]) => {
      const p1 = game?.player1?.enrollment?.user.username;
      const p2 = game?.player2?.enrollment?.user.username;

      // Determine the opponent's name
      return user?.username === p1 ? p2 : p1;
    })
  );

  constructor(
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

  // Handles result confirmation
  async onConfirm() {
    this.alertService.clear();

    const game = await firstValueFrom(this.currentMatch$);

    await firstValueFrom(this.matchService.confirmResult(game!.id));
  }
}
