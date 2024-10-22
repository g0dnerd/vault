import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PushPipe } from '@ngrx/component';
import { Observable, of } from 'rxjs';

import { Draft } from '@vault/shared';
import { DraftState, selectSelectedDraft } from '../../store';
import { selectDraft } from '../../store/actions/draft.actions';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-admin-draft-card',
  standalone: true,
  imports: [NgFor, PushPipe],
  templateUrl: './admin-draft-card.component.html',
  styleUrl: './admin-draft-card.component.css',
})
export class AdminDraftCardComponent implements OnInit {
  draft$: Observable<Draft | null> = of(null);

  @Input({ transform: numberAttribute }) id = 0;

  constructor(private readonly draftStore$: Store<DraftState>) { }

  ngOnInit() {
    this.draftStore$.dispatch(selectDraft({ id: this.id }));
    this.draft$ = this.draftStore$.select(selectSelectedDraft);
  }
}
