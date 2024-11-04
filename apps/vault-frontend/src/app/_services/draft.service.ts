import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_ROUTES, Draft, DraftScorecard } from '@vault/shared';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DraftService {
  private readonly apiUrl = `${environment.apiUrl}${API_ROUTES.DRAFTS}`;
  private readonly scorecardApiUrl = `${environment.apiUrl}${API_ROUTES.DRAFTS}`;

  constructor(private readonly http: HttpClient) {}

  getById(id: number): Observable<Draft> {
    return this.http.get<Draft>(`${this.apiUrl}/${id}`);
  }

  getOngoingDrafts(tournamentId: number): Observable<Draft[]> {
    return this.http.get<Draft[]>(`${this.apiUrl}/${tournamentId}/ongoing`);
  }

  getCurrentDraft(tournamentId: number): Observable<Draft> {
    return this.http.get<Draft>(`${this.apiUrl}/current/${tournamentId}`);
  }

  getScorecardsForDraft(draftId: number): Observable<DraftScorecard[]> {
    return this.http.get<DraftScorecard[]>(
      `${this.scorecardApiUrl}/draft/${draftId}`
    );
  }
}
