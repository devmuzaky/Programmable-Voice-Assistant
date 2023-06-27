import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {StorageService} from "../services/storage.service";
import {TokenRefreshService} from "../services/token-refresh.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  jwt_token: string;

  constructor(private storageService: StorageService, private tokenRefreshService: TokenRefreshService) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.jwt_token = this.storageService.getAccessToken();
    if (this.jwt_token != null && request.url.indexOf('login') === -1 && request.url.indexOf('register') === -1) {
      console.log(this.jwt_token)
      request = request.clone({
        headers: request.headers.set("Authorization",
          "Bearer " + this.jwt_token)
      });
    } else {
      request = request.clone({
        withCredentials: true
      });
    }

    return next.handle(request);

    /* TODO: Implement refresh token logic
    *
    *
    *     return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          const refreshToken = this.storageService.getRefreshToken();
          return this.tokenRefreshService.refreshAccessToken(refreshToken).pipe(
            switchMap((response) => {
              if (response.accessToken) {
                // Token refresh successful, update the access token in storage
                this.storageService.saveAccessToken(response.accessToken);
                request = request.clone({
                  headers: request.headers.set(
                    'Authorization',
                    'Bearer ' + response.accessToken
                  ),
                });
                return next.handle(request);
              } else {
                return throwError('Token refresh failed');
              }
            }),
            catchError((refreshError) => {
              return throwError('Token refresh request failed');
            })
          );
        } else {
          return throwError(error);
        }
      })
    );
    *
    * */

  }
}

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
];
