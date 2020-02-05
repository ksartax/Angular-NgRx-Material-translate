import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@appEnvironments/environment';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@appAuthentication/index';

/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      url: environment.serverUrl + request.url,
      headers: request.headers.set('Authorization', 'Bearer ' + this.authenticationService.accessToken)
    });

    return next.handle(request);
  }
}
