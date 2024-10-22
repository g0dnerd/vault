import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Enrollment, API_ROUTES } from '@vault/shared';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentsService {
  private apiUrl = `${environment.apiUrl}${API_ROUTES.ENROLLMENTS}`;

  constructor(private http: HttpClient) {}

  getForTournament(tournamentId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}/tournament/${tournamentId}`);
  }

  enrollUser(tournamentId: number, userId: number): Observable<Enrollment> {
    const enrollData = { tournamentId, userId };
    return this.http.post<Enrollment>(this.apiUrl, enrollData)
      .pipe(
      catchError(
        this.handleError('createEnrollment', enrollData))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(operation, error); // log to console instead

      // Let the app keep running by returning an empty result.
      return result as Observable<T>;
    };
  }

}
