import { HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export function jwtInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const accessToken = localStorage.getItem('token');

  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken?.replace(/"/g, '')}`,
      Content: 'application/json',
    },
  });

  return next(req);
}
