import { NgFor } from '@angular/common';
import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PushPipe } from '@ngrx/component';
import { Observable, of } from 'rxjs';

import { Draft, Match } from '@vault/shared';
import {
  DraftAppState,
  MatchAppState,
  selectOngoingMatches,
  selectSelectedDraft,
} from '../../store';
import { selectDraft } from '../../store/actions/draft.actions';
import { initForDraft } from '../../store/actions/match.actions';

@Component({
  selector: 'app-admin-draft-card',
  standalone: true,
  imports: [NgFor, PushPipe],
  templateUrl: './admin-draft-card.component.html',
  styleUrl: './admin-draft-card.component.css',
})
export class AdminDraftCardComponent implements OnInit {
  draft$: Observable<Draft | null> = of(null);
  matches$: Observable<Match[]> = of([]);

  @Input({ transform: numberAttribute }) id = 0;

  constructor(
    private readonly draftStore$: Store<DraftAppState>,
    private readonly matchStore$: Store<MatchAppState>
  ) {}

  ngOnInit() {
    this.draftStore$.dispatch(selectDraft({ id: this.id }));
    this.matchStore$.dispatch(initForDraft({ draftId: this.id }));
    this.draft$ = this.draftStore$.select(selectSelectedDraft);
    this.matches$ = this.matchStore$.select(selectOngoingMatches);
  }
}
