import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_ROUTES, Match, MatchWithResult, Result } from '@vault/shared';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private apiUrl = `${environment.apiUrl}${API_ROUTES.MATCHES}`;
  private resultApiUrl = `${environment.apiUrl}${API_ROUTES.RESULTS}`;

  constructor(private readonly http: HttpClient) {}

  getAllMatches(): Observable<MatchWithResult[]> {
    return this.http.get<MatchWithResult[]>(this.apiUrl);
  }

  getMatchesForDraft(draftId: number): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiUrl}/draft/${draftId}`);
  }

  getCurrentUserCurrentMatch(
    tournamentId: number
  ): Observable<MatchWithResult> {
    return this.http.get<MatchWithResult>(
      `${this.apiUrl}/current/${tournamentId}`
    );
  }

  getById(matchId: number): Observable<MatchWithResult> {
    return this.http.get<MatchWithResult>(`${this.apiUrl}/${matchId}`);
  }

  // Reports a result to the API and returns the API response.
  reportResult(result: Result): Observable<MatchWithResult> {
    return this.http.post<MatchWithResult>(this.resultApiUrl, result);
  }

  // POSTs a request to confirm the match for `matchId`
  confirmResult(matchId: number): Observable<MatchWithResult> {
    return this.http.patch<MatchWithResult>(`${this.resultApiUrl}/${matchId}`, {
      confirmed: true,
    });
  }
}
