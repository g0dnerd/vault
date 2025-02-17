import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Image, API_ROUTES } from '@vault/shared';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl = `${environment.apiUrl}${API_ROUTES.IMAGES}`;

  constructor(private http: HttpClient) {}

  getImagesForPlayer(draftPlayerId: number): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.apiUrl}/player/${draftPlayerId}`);
  }

  delete(id: number): Observable<Image> {
    return this.http.delete<Image>(`${this.apiUrl}/${id}`);
  }
}
