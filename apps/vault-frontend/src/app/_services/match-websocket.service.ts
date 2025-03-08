import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { dev } from '../../environments/environment';
import { Match } from '@vault/shared';

@Injectable({
  providedIn: 'root',
})
export class MatchWebSocketService {
  constructor(private webSocket: Socket) {}

  listenForMatchUpdates() {
    return this.webSocket.fromEvent<Match, any>('matchUpdated');
  }
}
