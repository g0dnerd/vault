import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Enrollment, API_ROUTES } from '@vault/shared';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentsService {
  private apiUrl = `${environment.apiUrl}${API_ROUTES.ENROLLMENTS}`;

  constructor(private http: HttpClient) {}

  getForTournament(tournamentId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(
      `${this.apiUrl}/tournament/${tournamentId}`
    );
  }

  getForUserIdAndTournamentId(
    userId: number,
    tournamentId: number
  ): Observable<Enrollment> {
    return this.http.get<Enrollment>(
      `${this.apiUrl}/user/${userId}/tournament/${tournamentId}`
    );
  }

  enrollUser(tournamentId: number, userId: number): Observable<Enrollment> {
    const enrollData = { tournamentId, userId };
    return this.http.post<Enrollment>(this.apiUrl, enrollData);
  }
}
