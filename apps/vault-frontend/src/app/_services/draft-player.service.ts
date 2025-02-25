import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ROUTES, Player } from '@vault/shared';
import { dev } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DraftPlayerService {
  private apiUrl = `${dev.apiUrl}${API_ROUTES.PLAYERS}`;

  constructor(private readonly http: HttpClient) {}

  getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}`);
  }

  checkIn(player: Player, playerId: number): Observable<Player> {
    player = {
      ...player,
      checkedIn: true,
    };
    return this.http.patch<Player>(`${this.apiUrl}/patch/${playerId}`, player);
  }

  checkOut(player: Player, playerId: number): Observable<Player> {
    player = {
      ...player,
      checkedOut: true,
    };
    return this.http.patch<Player>(`${this.apiUrl}/patch/${playerId}`, player);
  }
}
