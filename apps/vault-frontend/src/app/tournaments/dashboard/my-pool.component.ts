import { NgIf } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { PushPipe } from '@ngrx/component';

import { PoolStatus } from '@vault/shared';
import { ManagePoolComponent } from './manage-pool.component';
import { PlayerService } from '../../_services/player.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-my-pool',
  standalone: true,
  imports: [NgIf, PushPipe, ManagePoolComponent],
  templateUrl: './my-pool.component.html',
  styleUrl: './my-pool.component.css',
})
export class MyPoolComponent implements OnInit {
  draftId = input.required<number>();
  poolStatus$: Observable<PoolStatus | null> = of(null);

  constructor(private readonly playerService: PlayerService) {}

  ngOnInit() {
    this.poolStatus$ = this.playerService.getPoolStatuses(this.draftId());
  }
}
