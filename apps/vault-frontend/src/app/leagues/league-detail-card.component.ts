import { NgFor } from '@angular/common';
import { Component, inject, Input, input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { Enrollment } from '@vault/shared';
import { selectLeaguePlayers, State } from '../_store';
import { initializeAllLeaguePlayers } from '../_store/actions/enrollment.actions';
import { PushPipe } from '@ngrx/component';

@Component({
  selector: 'app-league-detail-card',
  standalone: true,
  imports: [MatCardModule, PushPipe, NgFor],
  templateUrl: './league-detail-card.component.html',
  styleUrl: './league-detail-card.component.css',
})
export class LeagueDetailCardComponent implements OnInit {
  id = input.required<number>();
  @Input({ required: true }) tournamentName = '';

  private readonly store$ = inject(Store<State>);

  players$: Observable<Enrollment[]> = of([]);

  ngOnInit() {
    this.store$.dispatch(initializeAllLeaguePlayers());
    this.players$ = this.store$.select(selectLeaguePlayers(this.id()));
  }
}
