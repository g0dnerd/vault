import { Injectable } from '@angular/core';

import { dev } from '../../environments/environment';
import { API_ROUTES, Player } from '@vault/shared';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private readonly apiUrl = `${dev.apiUrl}${API_ROUTES.PLAYERS}`;

  constructor(private readonly http: HttpClient) {}

  getPoolStatuses(tournamentId: number): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrl}/pool-status/${tournamentId}`);
  }
}
