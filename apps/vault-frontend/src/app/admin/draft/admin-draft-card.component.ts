import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  Component,
  inject,
  Input,
  numberAttribute,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { PushPipe } from '@ngrx/component';
import { Observable, of } from 'rxjs';

import { Draft, Match, User } from '@vault/shared';
import { MatchWebSocketService } from '../../_services';
import {
  AuthAppState,
  DraftAppState,
  State,
  selectAuthUser,
  selectMatchesByQuery,
  selectSelectedDraft,
} from '../../_store';
import { selectDraft } from '../../_store/actions/draft.actions';
import {
  initializeMatchesForDraft,
  updateMatch,
} from '../../_store/actions/match.actions';
import { ReportResultFormComponent } from '../../tournaments/report-result-form/report-result-form.component';

@Component({
  selector: 'app-admin-draft-card',
  standalone: true,
  imports: [ReportResultFormComponent, NgClass, NgFor, NgIf, PushPipe],
  templateUrl: './admin-draft-card.component.html',
  styleUrl: './admin-draft-card.component.css',
})
export class AdminDraftCardComponent implements OnInit {
  private authStore$ = inject(Store<AuthAppState>);
  private matchStore$ = inject(Store<State>);
  private matchWebSocketService = inject(MatchWebSocketService);

  draft$: Observable<Draft | null> = of(null);
  matches$: Observable<Match[]> = of([]);
  user$: Observable<User | null> = this.authStore$.select(selectAuthUser);

  @Input({ transform: numberAttribute }) id = 0;

  constructor(private readonly draftStore$: Store<DraftAppState>) {
    // Listen to the match WebSocket service and have it update matches
    // on the corresponding event
    this.matchWebSocketService
      .listenForMatchUpdates()
      .subscribe((game: Match) => {
        this.matchStore$.dispatch(
          updateMatch({ update: { id: game.id, changes: game } })
        );
      });
  }

  ngOnInit() {
    this.matchStore$.dispatch(initializeMatchesForDraft({ draftId: this.id }));
    this.draftStore$.dispatch(selectDraft({ id: this.id }));
    this.draft$ = this.draftStore$.select(selectSelectedDraft);
    this.matches$ = this.matchStore$.select(
      selectMatchesByQuery((game: Match) => game?.round?.draftId == this.id)
    );
  }
}
