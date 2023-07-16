import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {StorageService} from '../services/storage.service';
import {TokenRefreshService} from '../services/token-refresh.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService, private tokenRefreshService: TokenRefreshService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = this.storageService.getAccessToken();
    if (jwtToken != null && request.url.indexOf('login') === -1 && request.url.indexOf('register') === -1) {
      console.log(jwtToken);
      request = this.addAuthorizationHeader(request, jwtToken);
    } else {
      request = request.clone({withCredentials: true});

    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          const refreshToken = this.storageService.getRefreshToken();
          return this.tokenRefreshService.refreshAccessToken(refreshToken).pipe(
            switchMap((response) => {
              if (response.accessToken) {
                this.storageService.saveAccessToken(response.accessToken);
                request = this.addAuthorizationHeader(request, response.accessToken);
                return next.handle(request);
              } else {
                return throwError('Token refresh failed');
              }
            }),
            catchError(() => throwError('Token refresh request failed'))
          );
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addAuthorizationHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
];
