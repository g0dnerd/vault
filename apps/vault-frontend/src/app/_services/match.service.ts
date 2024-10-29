import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_ROUTES, Match, Result } from '@vault/shared';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private apiUrl = `${environment.apiUrl}${API_ROUTES.MATCHES}`;
  private resultApiUrl = `${environment.apiUrl}${API_ROUTES.RESULTS}`;

  constructor(private readonly http: HttpClient) {}

  getAllMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(this.apiUrl);
  }

  getMatchesForDraft(draftId: number): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiUrl}/draft/${draftId}`);
  }

  getCurrentMatchForUser(
    userId: number,
    tournamentId: number
  ): Observable<Match> {
    return this.http.get<Match>(`${this.apiUrl}/current/${tournamentId}`);
  }

  getById(matchId: number): Observable<Match> {
    return this.http.get<Match>(`${this.apiUrl}/${matchId}`);
  }

  // Reports a result to the API and returns the API response.
  reportResult(matchId: number, result: Result): Observable<Match> {
    return this.http.patch<Match>(`${this.apiUrl}/${matchId}`, result);
  }

  // POSTs a request to confirm the match for `matchId`
  confirmResult(matchId: number): Observable<Match> {
    return this.http.patch<Match>(`${this.resultApiUrl}/${matchId}`, {
      confirmed: true,
    });
  }
}
