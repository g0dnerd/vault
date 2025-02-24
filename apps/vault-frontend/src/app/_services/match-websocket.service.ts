import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { dev } from '../../environments/environment';
import { Match } from '@vault/shared';

@Injectable({
  providedIn: 'root',
})
export class MatchWebSocketService {
  private webSocket: Socket;
  constructor() {
    this.webSocket = new Socket({
      url: dev.webSocketUrl,
      options: {
        transports: ['websocket'],
      },
    });
  }

  listenForMatchUpdates() {
    return this.webSocket.fromEvent<Match>('matchUpdated');
  }
}
