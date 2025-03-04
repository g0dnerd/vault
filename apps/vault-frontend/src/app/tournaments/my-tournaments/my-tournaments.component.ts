import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { Tournament } from '@vault/shared';
import { selectEnrolledTournaments, State } from '../../_store';
import {
  initializePublicTournaments,
  initializeEnrolledTournaments,
} from '../../_store/actions/tournaments.actions';

@Component({
  templateUrl: 'my-tournaments.component.html',
  styleUrl: './my-tournaments.component.css',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, PushPipe],
})
export class MyTournamentsComponent implements OnInit {
  private readonly store$ = inject(Store<State>);

  enrolledTournaments$: Observable<Tournament[]> = of([]);

  ngOnInit() {
    this.store$.dispatch(initializePublicTournaments());
    this.store$.dispatch(initializeEnrolledTournaments());
    this.enrolledTournaments$ = this.store$.select(selectEnrolledTournaments);
  }
}
