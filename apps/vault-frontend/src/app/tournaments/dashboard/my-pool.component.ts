import { NgIf } from '@angular/common';
import {
  Component,
  inject,
  Input,
  numberAttribute,
  OnInit,
} from '@angular/core';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { filter, Observable, of } from 'rxjs';

import { Player, User } from '@vault/shared';
import { ManagePoolComponent } from './manage-pool.component';
import {
  AuthAppState,
  selectAuthUser,
  selectPlayerByQuery,
  State,
} from '../../_store';

@Component({
  selector: 'app-my-pool',
  standalone: true,
  imports: [NgIf, PushPipe, ManagePoolComponent],
  templateUrl: './my-pool.component.html',
  styleUrl: './my-pool.component.css',
})
export class MyPoolComponent implements OnInit {
  @Input({ required: true, transform: numberAttribute }) id = 0;

  private readonly authStore$ = inject(Store<AuthAppState>);
  private readonly store$ = inject(Store<State>);

  readonly checkinStatus$: Observable<boolean> = of(false);
  readonly checkoutStatus$: Observable<boolean> = of(false);
  readonly user$: Observable<User | null> =
    this.authStore$.select(selectAuthUser);

  player$: Observable<Player | undefined> = of(undefined);

  ngOnInit() {
    this.user$.subscribe((user) => {
      if (user) {
        this.player$ = this.store$
          .select(
            selectPlayerByQuery(
              (player) =>
                player.enrollment?.userId == user.id &&
                player.draftId == this.id
            )
          )
          .pipe(filter((player): player is Player => player != undefined));
      }
    });
  }
}
