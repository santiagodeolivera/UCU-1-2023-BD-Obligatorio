import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem("token");

    if (!token || !req.url.includes(environment.baseUrl)) {
      return next.handle(req);
    }

    const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next.handle(cloned);
  }
}
