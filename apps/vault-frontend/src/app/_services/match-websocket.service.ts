import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { environment } from '../../environments/environment';
import { Match } from '@vault/shared';

@Injectable({
  providedIn: 'root',
})
export class MatchWebSocketService {
  private webSocket: Socket;
  constructor() {
    this.webSocket = new Socket({
      url: environment.webSocketUrl,
      options: {
        transports: ['websocket'],
      },
    });
  }

  listenForMatchUpdates() {
    return this.webSocket.fromEvent<Match>('matchUpdated');
  }
}
