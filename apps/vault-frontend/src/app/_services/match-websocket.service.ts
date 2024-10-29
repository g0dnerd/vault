import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { Match } from '@vault/shared';

@Injectable({
  providedIn: 'root',
})
export class MatchWebSocketService {
  private webSocket: Socket;
  constructor() {
    this.webSocket = new Socket({
      url: 'http://192.168.2.65:4200',
      options: {
        path: '/matches',
        transports: ['websocket'],
      },
    });
  }

  connectSocket(message: string) {
    this.webSocket.emit('connect', message);
  }

  listenForMatchUpdates() {
    return this.webSocket.fromEvent<Match>('matchUpdated');
  }

  disconnectSocket() {
    this.webSocket.disconnect();
  }
}
