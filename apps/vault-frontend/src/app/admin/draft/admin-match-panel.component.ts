import { Component, inject, input } from '@angular/core';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { MatchAppState, selectCurrentMatch } from '../../_store';
import { Observable, of } from 'rxjs';
import { Match } from '@vault/shared';
import { initSingleMatch } from '../../_store/actions/match.actions';

@Component({
  selector: 'app-admin-match-panel',
  standalone: true,
  imports: [PushPipe],
  templateUrl: './admin-match-panel.component.html',
  styleUrl: './admin-match-panel.component.css',
})
export class AdminMatchPanelComponent {
  matchId = input.required<number>();

  private readonly matchStore$ = inject(Store<MatchAppState>);

  match$: Observable<Match | null> = of(null);

  ngOnInit() {
    this.matchStore$.dispatch(initSingleMatch({ matchId: this.matchId() }));
    this.match$ = this.matchStore$.select(selectCurrentMatch);
  }
}
