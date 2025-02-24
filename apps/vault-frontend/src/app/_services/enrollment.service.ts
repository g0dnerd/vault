import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { dev } from '../../environments/environment';
import { Enrollment, API_ROUTES } from '@vault/shared';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentsService {
  private apiUrl = `${dev.apiUrl}${API_ROUTES.ENROLLMENTS}`;

  constructor(private http: HttpClient) {}

  getForTournament(tournamentId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(
      `${this.apiUrl}/tournament/${tournamentId}`
    );
  }

  getForUser(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}/current`);
  }

  getForUserAndTournamentId(tournamentId: number): Observable<Enrollment> {
    return this.http.get<Enrollment>(`${this.apiUrl}/current/${tournamentId}`);
  }

  enrollUser(tournamentId: number, userId: number): Observable<Enrollment> {
    const enrollData = { tournamentId, userId };
    return this.http.post<Enrollment>(this.apiUrl, enrollData);
  }
}
