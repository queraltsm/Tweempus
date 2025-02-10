import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LogInterceptorService } from './core/log.interceptor.service';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors   } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';


const logInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const interceptor = inject(LogInterceptorService); // Inject the service
  return interceptor.intercept(req, { handle: (r: HttpRequest<any>) => next(r) }); // Call the intercept method
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withInterceptors([logInterceptorFn]))
  ]
};
