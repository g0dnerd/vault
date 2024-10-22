import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { API_ROUTES, Match, Result } from '@vault/shared';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private apiUrl = `${environment.apiUrl}${API_ROUTES.MATCHES}`;
  private resultApiUrl = `${environment.apiUrl}${API_ROUTES.RESULTS}`;

  constructor(private readonly http: HttpClient) { }

  getAllMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(this.apiUrl);
  }

  getCurrentMatchByUserId(userId: number, tournamentId: number): Observable<Match> {
    return this.http.get<Match>(`${this.apiUrl}/${userId}/current/${tournamentId}`);
  }

  getCurrentUserCurrentMatch(tournamentId: number): Observable<Match> {
    return this.http.get<Match>(`${this.apiUrl}/current/${tournamentId}`);
  }

  getById(matchId: number): Observable<Match> {
    return this.http.get<Match>(`${this.apiUrl}/${matchId}`);
  }

  /// Reports a result to the API and returns the API response.
  reportResult(result: Result): Observable<Match> {
    return this.http.post<Match>(this.resultApiUrl, result);
  }
}
