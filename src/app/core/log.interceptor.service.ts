import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogInterceptorService  implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requestTime = new Date().toLocaleTimeString();
    console.log(`[LOG] ${req.method} ${req.url} - Sent at ${requestTime}`);
    return next.handle(req).pipe(
      tap(event => {
        console.log(`[LOG] ${req.method} ${req.url} - Recieved at ${new Date().toLocaleTimeString()}`);
      })
    );
  }

}