import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { dev } from '../../environments/environment';
import { API_ROUTES, CreateTournamentDto, Tournament } from '@vault/shared';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private readonly apiUrl = `${dev.apiUrl}${API_ROUTES.TOURNAMENTS}`;

  constructor(private readonly http: HttpClient) {}

  createTournament(tournament: CreateTournamentDto): Observable<Tournament> {
    return this.http.post<Tournament>(this.apiUrl, tournament);
  }

  getAllTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.apiUrl);
  }

  getAvailableTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this.apiUrl}/available`);
  }

  getEnrolled(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this.apiUrl}/enrolled`);
  }

  getUserLeagues(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this.apiUrl}/enrolled-leagues`);
  }
}
