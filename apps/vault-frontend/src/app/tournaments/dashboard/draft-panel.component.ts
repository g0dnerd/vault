import { Component, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Draft } from '@vault/shared';
import { DraftAppState, selectCurrentDraft, State } from '../../_store';
import { MatchPanelComponent } from './match-panel.component';
import { MyPoolComponent } from './my-pool.component';
import { initializePlayerImages } from '../../_store/actions/image.actions';
import { initializeMatchesForDraft } from '../../_store/actions/match.actions';

@Component({
  selector: 'app-draft-panel',
  standalone: true,
  imports: [MatchPanelComponent, MyPoolComponent, NgIf, PushPipe],
  templateUrl: './draft-panel.component.html',
  styleUrl: './draft-panel.component.css',
})
export class DraftPanelComponent implements OnInit {
  private readonly draftStore$ = inject(Store<DraftAppState>);
  private readonly store$ = inject(Store<State>);

  currentDraft$: Observable<Draft | null> =
    this.draftStore$.select(selectCurrentDraft);

  ngOnInit() {
    this.currentDraft$.subscribe((draft) => {
      if (draft) {
        this.store$.dispatch(initializePlayerImages({ draftId: draft.id }));
        this.store$.dispatch(initializeMatchesForDraft({ draftId: draft.id }));
      }
    });
  }
}
