import { NgFor } from '@angular/common';
import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PushPipe } from '@ngrx/component';
import { Observable, of } from 'rxjs';

import { Draft, Match } from '@vault/shared';
import {
  DraftAppState,
  State,
  selectAllMatches,
  selectSelectedDraft,
} from '../../store';
import { selectDraft } from '../../store/actions/draft.actions';
import { initializeMatches } from '../../store/actions/match.actions';

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
    private readonly store$: Store<State>,
    private readonly draftStore$: Store<DraftAppState>
  ) {}

  ngOnInit() {
    this.draftStore$.dispatch(selectDraft({ id: this.id }));
    this.draft$ = this.draftStore$.select(selectSelectedDraft);

    this.store$.dispatch(initializeMatches({ draftId: this.id }));
    this.matches$ = this.store$.select(selectAllMatches);
  }
}
