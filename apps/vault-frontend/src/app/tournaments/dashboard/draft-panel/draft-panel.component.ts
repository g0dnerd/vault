import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { PushPipe } from '@ngrx/component';

import { MatchPanelComponent, MyPoolComponent } from '..';
import { Store } from '@ngrx/store';
import { DraftAppState, selectCurrentDraft } from '../../../_store';
import { Observable, of } from 'rxjs';
import { Draft } from '@vault/shared';

@Component({
  selector: 'app-draft-panel',
  standalone: true,
  imports: [MatchPanelComponent, MyPoolComponent, NgIf, PushPipe],
  templateUrl: './draft-panel.component.html',
  styleUrl: './draft-panel.component.css',
})
export class DraftPanelComponent {
  private readonly draftStore$ = inject(Store<DraftAppState>);

  draft$: Observable<Draft | null> = of(null);

  ngOnInit() {
    this.draft$ = this.draftStore$.select(selectCurrentDraft);
  }
}
