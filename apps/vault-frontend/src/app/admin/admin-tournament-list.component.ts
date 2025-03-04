import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { PushPipe } from '@ngrx/component';

import { Tournament } from '@vault/shared';
import { selectAllTournaments, State } from '../_store';

@Component({
  selector: 'app-admin-tournament-list',
  standalone: true,
  imports: [CommonModule, PushPipe, RouterLink],
  templateUrl: './admin-tournament-list.component.html',
  styleUrl: './admin-tournament-list.component.css',
})
export class AdminTournamentListComponent implements OnInit {
  allTournaments$: Observable<Tournament[]> = of([]);

  private readonly tournamentsStore$ = inject(Store<State>);

  ngOnInit() {
    this.allTournaments$ = this.tournamentsStore$.select(selectAllTournaments);
  }
}
