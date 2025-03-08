import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { dev } from '../../environments/environment';
import { API_ROUTES, User } from '@vault/shared';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly apiUrl = `${dev.apiUrl}${API_ROUTES.USER}`;

  constructor(private readonly http: HttpClient) {}

  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  updateUserProfile(username: string, email: string): Observable<User> {
    const user = { email, username };
    return this.http.patch<User>(this.apiUrl, user);
  }

  isCurrentUserAdmin(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/is-admin`);
  }
}
