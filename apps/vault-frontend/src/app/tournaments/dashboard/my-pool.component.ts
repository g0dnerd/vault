import { NgIf } from '@angular/common';
import { Component, inject, Input, numberAttribute } from '@angular/core';
import { PushPipe } from '@ngrx/component';
import { filter, Observable, of } from 'rxjs';

import { Player } from '@vault/shared';
import { ManagePoolComponent } from './manage-pool.component';
import { Store } from '@ngrx/store';
import { selectPlayerByQuery, State } from '../../_store';

@Component({
  selector: 'app-my-pool',
  standalone: true,
  imports: [NgIf, PushPipe, ManagePoolComponent],
  templateUrl: './my-pool.component.html',
  styleUrl: './my-pool.component.css',
})
export class MyPoolComponent {
  @Input({ required: true, transform: numberAttribute }) id = 0;

  private readonly store$ = inject(Store<State>);

  readonly checkinStatus$: Observable<boolean> = of(false);
  readonly checkoutStatus$: Observable<boolean> = of(false);

  player$: Observable<Player | undefined> = this.store$
    .select(selectPlayerByQuery((player) => player.draftId == this.id))
    .pipe(filter((player): player is Player => player != undefined));
}
