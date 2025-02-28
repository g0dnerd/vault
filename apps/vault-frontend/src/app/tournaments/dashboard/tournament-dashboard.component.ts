import { NgIf } from '@angular/common';
import {
  Component,
  inject,
  Input,
  numberAttribute,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { PushPipe } from '@ngrx/component';

import { Draft, Enrollment, Tournament } from '@vault/shared';
import { DraftPanelComponent } from './draft-panel.component';
import {
  DraftAppState,
  selectCurrentDraft,
  selectEnrollmentByQuery,
  selectTournamentById,
  State,
} from '../../_store';
import { initCurrentDraft } from '../../_store/actions/draft.actions';
import { initializeAllTournaments } from '../../_store/actions/tournaments.actions';
import { initializeAllEnrollments } from '../../_store/actions/enrollment.actions';

@Component({
  selector: 'app-tournament-dashboard',
  standalone: true,
  imports: [NgIf, RouterLink, DraftPanelComponent, PushPipe],
  templateUrl: './tournament-dashboard.component.html',
  styleUrl: './tournament-dashboard.component.css',
})
export class TournamentDashboardComponent implements OnInit {
  @Input({ required: true, transform: numberAttribute }) tournamentId = 0;

  private readonly store$ = inject(Store<State>);
  private readonly draftStore$ = inject(Store<DraftAppState>);

  tournament$: Observable<Tournament | undefined> = of(undefined);
  enrollment$: Observable<Enrollment | undefined> = of(undefined);
  // currentDraft$: Observable<Draft | null> = of(null);
  currentDraft$: Observable<Draft | null> =
    this.draftStore$.select(selectCurrentDraft);

  ngOnInit() {
    this.store$.dispatch(initializeAllTournaments());
    this.store$.dispatch(initializeAllEnrollments());

    this.enrollment$ = this.store$.select(
      selectEnrollmentByQuery(
        (enrollment: Enrollment) =>
          enrollment?.tournamentId == this.tournamentId
      )
    );
    this.tournament$ = this.store$.select(
      selectTournamentById(this.tournamentId)
    );
    this.draftStore$.dispatch(
      initCurrentDraft({ tournamentId: this.tournamentId })
    );
    // this.currentDraft$ = this.draftStore$.select(selectCurrentDraft);
    this.currentDraft$.subscribe((draft) => {
      console.log('Tournament dashboard has draft id', draft?.id);
    });
  }
}
