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

  constructor(private readonly http: HttpClient) {}

  getAllOngoingMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiUrl}/ongoing`);
  }

  getMatchesForDraft(draftId: number): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiUrl}/draft/${draftId}`);
  }

  getById(matchId: number): Observable<Match> {
    return this.http.get<Match>(`${this.apiUrl}/${matchId}`);
  }

  // Reports a result to the API and returns the API response.
  reportResult(
    userId: number,
    matchId: number,
    result: Result
  ): Observable<Match> {
    result = {
      ...result,
      reportedById: userId,
    };
    return this.http.patch<Match>(`${this.apiUrl}/report/${matchId}`, result);
  }

  // PATCH request to confirm the match for `matchId`
  confirmResult(matchId: number): Observable<Match> {
    return this.http.patch<Match>(`${this.apiUrl}/confirm/${matchId}`, {
      resultConfirmed: true,
    });
  }
}
