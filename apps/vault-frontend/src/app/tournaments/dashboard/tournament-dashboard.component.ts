import { NgIf } from '@angular/common';
import {
  Component,
  inject,
  Input,
  numberAttribute,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { PushPipe } from '@ngrx/component';

import { Enrollment, Tournament } from '@vault/shared';
import { DraftPanelComponent } from '.';
import {
  AuthAppState,
  DraftAppState,
  MatchAppState,
  PlayerAppState,
  selectEnrollmentByQuery,
  selectTournamentById,
  State,
} from '../../_store';
import { initCurrentDraft } from '../../_store/actions/draft.actions';
import { initializePublicTournaments } from '../../_store/actions/tournaments.actions';
import { initializeAllEnrollments } from '../../_store/actions/enrollment.actions';
import { initCurrentMatch } from '../../_store/actions/match.actions';
import { initProfile } from '../../_store/actions/auth.actions';
import { initCurrentPoolStatus } from '../../_store/actions/player.actions';

@Component({
  selector: 'app-tournament-dashboard',
  standalone: true,
  imports: [DraftPanelComponent, MatCardModule, NgIf, PushPipe, RouterLink],
  templateUrl: './tournament-dashboard.component.html',
  styleUrl: './tournament-dashboard.component.css',
})
export class TournamentDashboardComponent implements OnInit {
  @Input({ required: true, transform: numberAttribute }) tournamentId = 0;

  private readonly store$ = inject(Store<State>);
  private readonly authStore$ = inject(Store<AuthAppState>);
  private readonly draftStore$ = inject(Store<DraftAppState>);
  private readonly matchStore$ = inject(Store<MatchAppState>);
  private readonly playerStore$ = inject(Store<PlayerAppState>);

  tournament$: Observable<Tournament | undefined> = of(undefined);
  enrollment$: Observable<Enrollment | undefined> = of(undefined);

  ngOnInit() {
    this.authStore$.dispatch(initProfile());
    this.store$.dispatch(initializePublicTournaments());
    this.store$.dispatch(initializeAllEnrollments());
    this.draftStore$.dispatch(
      initCurrentDraft({ tournamentId: this.tournamentId })
    );
    this.matchStore$.dispatch(
      initCurrentMatch({ tournamentId: this.tournamentId })
    );
    this.playerStore$.dispatch(
      initCurrentPoolStatus({ tournamentId: this.tournamentId })
    );
    this.tournament$ = this.store$.select(
      selectTournamentById(this.tournamentId)
    );
    this.enrollment$ = this.store$.select(
      selectEnrollmentByQuery(
        (enrollment: Enrollment) =>
          enrollment?.tournamentId == this.tournamentId
      )
    );
  }
}
