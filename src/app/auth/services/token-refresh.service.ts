import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenRefreshService {
  constructor(private http: HttpClient) {}

  refreshAccessToken(refreshToken: string): Observable<any> {
    const refreshTokenEndpoint = 'http://localhost:8080/api/auth/refresh-token';

    return this.http.post(refreshTokenEndpoint, { refreshToken });
  }
}
