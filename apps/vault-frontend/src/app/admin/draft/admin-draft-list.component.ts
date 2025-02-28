import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NgFor } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { Draft } from '@vault/shared';
import { DraftAppState, selectOngoingDraft } from '../../_store';
import { initOngoingDrafts } from '../../_store/actions/draft.actions';
import { AdminDraftCardComponent } from './admin-draft-card.component';

@Component({
  selector: 'app-admin-draft-list',
  standalone: true,
  imports: [NgFor, PushPipe, AdminDraftCardComponent],
  templateUrl: './admin-draft-list.component.html',
  styleUrl: './admin-draft-list.component.css',
})
export class AdminDraftListComponent implements OnInit {
  drafts$: Observable<Draft[]> = of([]);

  constructor(private readonly draftsStore$: Store<DraftAppState>) {}

  @Input({ transform: numberAttribute }) tournamentId = 0;

  ngOnInit(): void {
    this.draftsStore$.dispatch(
      initOngoingDrafts({ tournamentId: this.tournamentId })
    );
    this.drafts$ = this.draftsStore$.select(selectOngoingDraft);
  }
}
