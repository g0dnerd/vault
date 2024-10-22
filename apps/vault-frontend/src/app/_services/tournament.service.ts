import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { API_ROUTES, Tournament } from '@vault/shared';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private apiUrl = `${environment.apiUrl}${API_ROUTES.TOURNAMENTS}`;

  constructor(private http: HttpClient) {}

  createTournament(tournament: Tournament): Observable<Tournament> {
    return this.http.post<Tournament>(this.apiUrl, tournament);
  }

  getAllTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.apiUrl);
  }

  getById(tournamentId: number): Observable<Tournament> {
    return this.http.get<Tournament>(`${this.apiUrl}/${tournamentId}`);
  }

  getAvailableTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this.apiUrl}/available`);
  }

  getUserTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this.apiUrl}/enrolled`);
  }
}
