import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from "../services/storage.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  jwt_token: string;

  constructor(private storageService: StorageService) {
    this.jwt_token = this.storageService.getAccessToken();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("jwt", this.jwt_token)
    if (this.jwt_token != null && request.url.indexOf('login') === -1) {
      console.log("ddnk")
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
  }
}

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
];
