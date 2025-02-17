import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ROUTES, Player } from '@vault/shared';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DraftPlayerService {
  private apiUrl = `${environment.apiUrl}${API_ROUTES.PLAYERS}`;

  constructor(private readonly http: HttpClient) {}

  getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}`);
  }

  getPlayersForTournament(tournamentId: number): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/tournament/${tournamentId}`);
  }

  getPlayersForUser(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/user`);
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
