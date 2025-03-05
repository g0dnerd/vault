import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { PushPipe } from '@ngrx/component';
import { Observable } from 'rxjs';

import { PoolStatus } from '@vault/shared';
import { ManagePoolComponent } from './manage-pool.component';
import { Store } from '@ngrx/store';
import { PlayerAppState, selectCurrentPoolStatus } from '../../../_store';

@Component({
  selector: 'app-my-pool',
  standalone: true,
  imports: [ManagePoolComponent, MatExpansionModule, NgIf, PushPipe],
  templateUrl: './my-pool.component.html',
  styleUrl: './my-pool.component.css',
})
export class MyPoolComponent {
  private readonly playerStore$ = inject(Store<PlayerAppState>);

  readonly poolStatus$: Observable<PoolStatus | null> =
    this.playerStore$.select(selectCurrentPoolStatus);
}
