import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { AuthInterface, AuthPayload } from '@vault/shared';
import { API_ROUTES } from '@vault/shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginApiUrl = `${environment.apiUrl}${API_ROUTES.LOGIN}`;
  private registerApiUrl = `${environment.apiUrl}${API_ROUTES.REGISTER}`;
  private statusApiUrl = `${environment.apiUrl}${API_ROUTES.STATUS}`;

  constructor(private http: HttpClient) { }

  login(payload: AuthPayload): Observable<AuthInterface> {
    return this.http.post<AuthInterface>(this.loginApiUrl, payload);
  }

  register(payload: AuthPayload): Observable<AuthInterface> {
    return this.http.post<AuthInterface>(this.registerApiUrl, payload);
  }

  status(): Observable<AuthInterface> {
    return this.http.get<AuthInterface>(this.statusApiUrl);
  }

}
