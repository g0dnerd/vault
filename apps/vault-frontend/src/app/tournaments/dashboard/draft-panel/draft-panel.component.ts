import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { Draft } from '@vault/shared';
import { DraftAppState, selectCurrentDraft } from '../../../_store';
import { MatchPanelComponent, MyPoolComponent } from '..';

@Component({
  selector: 'app-draft-panel',
  standalone: true,
  imports: [
    MatCardModule,
    MatchPanelComponent,
    MatDividerModule,
    MyPoolComponent,
    NgIf,
    PushPipe,
    RouterLink,
  ],
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
