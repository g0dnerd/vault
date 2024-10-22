import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { API_ROUTES, Draft, DraftScorecard } from '@vault/shared';

@Injectable({
  providedIn: 'root',
})
export class DraftService {
  private readonly apiUrl = `${environment.apiUrl}${API_ROUTES.DRAFTS}`;
  private readonly scorecardApiUrl = `${environment.apiUrl}${API_ROUTES.DRAFTS}`;

  constructor(private readonly http: HttpClient) { }

  getById(id: number): Observable<Draft> {
    return this.http.get<Draft>(`${this.apiUrl}/${id}`);
  }

  getOngoingDrafts(tournamentId: number): Observable<Draft[]> {
    return this.http.get<Draft[]>(`${this.apiUrl}/${tournamentId}/ongoing`);
  }

  getCurrentDraft(): Observable<Draft> {
    return this.http.get<Draft>(`${this.apiUrl}/current`);
  }

  // TODO: Implement this in the backend
  makeStandings(draftId: number, round: number): Observable<DraftScorecard[]> {
    return this.http.get<DraftScorecard[]>(`${this.scorecardApiUrl}/draft/${draftId}/round/${round}`);
  }
}
