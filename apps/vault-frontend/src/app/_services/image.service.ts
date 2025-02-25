import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Image, API_ROUTES } from '@vault/shared';
import { dev } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private readonly apiUrl = `${dev.apiUrl}${API_ROUTES.IMAGES}`;

  constructor(private readonly http: HttpClient) {}

  getAllImages(): Observable<Image[]> {
    return this.http.get<Image[]>(this.apiUrl);
  }

  getImagesForPlayer(draftId: number): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.apiUrl}/draft/${draftId}`);
  }

  delete(id: number): Observable<Image> {
    return this.http.delete<Image>(`${this.apiUrl}/${id}`);
  }

  handleImageUpload(formData: FormData): Observable<Image> {
    return this.http.post<Image>(`${this.apiUrl}/upload`, formData);
  }
}
