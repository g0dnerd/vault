import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { selectTournamentById, State } from '../../_store';
import { Tournament } from '@vault/shared';

@Component({
  selector: 'app-tournament-detail-card',
  standalone: true,
  imports: [PushPipe, RouterLink],
  templateUrl: './tournament-detail-card.component.html',
  styleUrl: './tournament-detail-card.component.css',
})
export class TournamentDetailCardComponent implements OnInit {
  @Input({ required: true, transform: numberAttribute }) tournamentId = 0;
  tournament$: Observable<Tournament | undefined> = of(undefined);

  constructor(private readonly store$: Store<State>) {}

  ngOnInit() {
    this.tournament$ = this.store$.select(
      selectTournamentById(this.tournamentId)
    );
  }
}
