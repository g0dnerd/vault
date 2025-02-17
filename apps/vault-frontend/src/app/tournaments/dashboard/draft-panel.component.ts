import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Draft } from '@vault/shared';
import { DraftAppState, selectCurrentDraft } from '../../_store';
import { MatchPanelComponent } from './match-panel.component';
import { MyPoolComponent } from './my-pool.component';

@Component({
  selector: 'app-draft-panel',
  standalone: true,
  imports: [MatchPanelComponent, MyPoolComponent, NgIf, PushPipe],
  templateUrl: './draft-panel.component.html',
  styleUrl: './draft-panel.component.css',
})
export class DraftPanelComponent {
  private readonly draftStore$ = inject(Store<DraftAppState>);

  currentDraft$: Observable<Draft | null> =
    this.draftStore$.select(selectCurrentDraft);
}
