import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_ROUTES, Match, Result } from '@vault/shared';
import { dev } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private apiUrl = `${dev.apiUrl}${API_ROUTES.MATCHES}`;

  constructor(private readonly http: HttpClient) {}

  getCurrentMatch(draftId: number) {
    return this.http.get<Match>(`${this.apiUrl}/draft/${draftId}`);
  }

  // Reports a result to the API and returns the API response.
  reportResult(matchId: number, result: Result): Observable<Match> {
    return this.http.patch<Match>(`${this.apiUrl}/report/${matchId}`, result);
  }

  // PATCH request to confirm the match for `matchId`
  confirmResult(matchId: number): Observable<Match> {
    return this.http.patch<Match>(`${this.apiUrl}/confirm/${matchId}`, {
      resultConfirmed: true,
    });
  }
}
