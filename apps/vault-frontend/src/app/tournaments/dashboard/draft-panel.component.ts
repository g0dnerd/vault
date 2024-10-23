import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { Draft } from '@vault/shared';
import { DraftAppState, selectCurrentDraft } from '../../store';
import { initCurrent } from '../../store/actions/draft.actions';

@Component({
  selector: 'app-draft-panel',
  standalone: true,
  imports: [PushPipe, CommonModule],
  templateUrl: './draft-panel.component.html',
  styleUrl: './draft-panel.component.css',
})
export class DraftPanelComponent implements OnInit {
  currentDraft$: Observable<Draft | null> = of(null);

  constructor(private readonly draftStore$: Store<DraftAppState>) {}

  ngOnInit() {
    // Dispatch a call to initialize the current draft to the draft store
    this.draftStore$.dispatch(initCurrent());
    // Get the currentDraft slice of the draft state
    this.currentDraft$ = this.draftStore$.select(selectCurrentDraft);
  }
}
