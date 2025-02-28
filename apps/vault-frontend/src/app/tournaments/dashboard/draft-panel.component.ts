import {
  Component,
  inject,
  Input,
  numberAttribute,
  OnInit,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { DraftAppState, MatchAppState, selectCurrentDraft } from '../../_store';
import { MatchPanelComponent } from './match-panel.component';
import { MyPoolComponent } from './my-pool.component';
import { initCurrentMatch } from '../../_store/actions/match.actions';

@Component({
  selector: 'app-draft-panel',
  standalone: true,
  imports: [MatchPanelComponent, MyPoolComponent, NgIf, PushPipe],
  templateUrl: './draft-panel.component.html',
  styleUrl: './draft-panel.component.css',
})
export class DraftPanelComponent implements OnInit {
  @Input({ required: true, transform: numberAttribute }) tournamentId = 0;
  private readonly draftStore$ = inject(Store<DraftAppState>);

  readonly currentDraft$ = this.draftStore$.select(selectCurrentDraft);

  constructor(private readonly matchStore$: Store<MatchAppState>) {}

  ngOnInit() {
    this.currentDraft$.subscribe((draft) => {
      console.log('Draft panel has draftId ', draft?.id);
      if (draft) {
        this.matchStore$.dispatch(initCurrentMatch({ draftId: draft.id }));
      }
    });
  }
}
