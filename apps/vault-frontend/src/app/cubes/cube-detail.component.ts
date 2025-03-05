import { Component, inject, input, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { Cube } from '@vault/shared';
import { selectCubeById, State } from '../_store';
import { initializeAllCubes } from '../_store/actions/cube.actions';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cube-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    NgIf,
    PushPipe,
  ],
  templateUrl: './cube-detail.component.html',
  styleUrl: './cube-detail.component.css',
})
export class CubeDetailComponent implements OnInit {
  cubeId = input.required<number>();

  private readonly store$ = inject(Store<State>);

  cube$: Observable<Cube | undefined> = of(undefined);

  ngOnInit() {
    this.store$.dispatch(initializeAllCubes());
    this.cube$ = this.store$.select(selectCubeById(this.cubeId()));
  }
}
