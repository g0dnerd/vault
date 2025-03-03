import { NgFor, NgIf } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { Draft, Match } from '@vault/shared';
import {
  DraftAppState,
  MatchAppState,
  selectCurrentDraft,
  selectOngoingMatches,
} from '../../_store';
import { initSingleDraft } from '../../_store/actions/draft.actions';
import {
  initDraftMatches,
  pairRound,
} from '../../_store/actions/match.actions';

@Component({
  selector: 'app-admin-draft-panel',
  standalone: true,
  imports: [NgFor, NgIf, PushPipe, RouterLink],
  templateUrl: './admin-draft-panel.component.html',
  styleUrl: './admin-draft-panel.component.css',
})
export class AdminDraftPanelComponent implements OnInit {
  draftId = input.required<number>();

  private readonly draftStore$ = inject(Store<DraftAppState>);
  private readonly matchStore$ = inject(Store<MatchAppState>);

  draft$: Observable<Draft | null> = of(null);
  matches$: Observable<Match[]> = of([]);

  ngOnInit() {
    this.draftStore$.dispatch(initSingleDraft({ draftId: this.draftId() }));
    this.matchStore$.dispatch(initDraftMatches({ draftId: this.draftId() }));
    this.draft$ = this.draftStore$.select(selectCurrentDraft);
    this.matches$ = this.matchStore$.select(selectOngoingMatches);
  }

  pairRound() {
    this.matchStore$.dispatch(pairRound({ draftId: this.draftId() }));
  }
}
