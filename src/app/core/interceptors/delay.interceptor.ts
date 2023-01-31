import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { delay, map, Observable } from 'rxjs';

@Injectable()
export class DelayInterceptor implements HttpInterceptor {

  get randomDelayMs(): number {
    return Math.random() * (500 - 300) + 300;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((response) => response),
      delay(this.randomDelayMs),
    );
  }
}
