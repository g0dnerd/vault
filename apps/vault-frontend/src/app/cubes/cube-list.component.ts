import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { Cube } from '@vault/shared';
import { selectAllCubes, State } from '../_store';
import { initializeAllCubes } from '../_store/actions/cube.actions';

@Component({
  selector: 'app-cube-list',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule, CommonModule, PushPipe],
  templateUrl: './cube-list.component.html',
  styleUrl: './cube-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CubeListComponent implements OnInit {
  cubes$: Observable<Cube[]> = of([]);

  private readonly store$ = inject(Store<State>);

  ngOnInit() {
    this.store$.dispatch(initializeAllCubes());
    this.cubes$ = this.store$.select(selectAllCubes);
  }
}
