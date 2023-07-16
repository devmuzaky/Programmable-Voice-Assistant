import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenRefreshService {

  private readonly refreshTokenEndpoint = 'http://localhost:8080/api/auth/refresh-token';

  constructor(private http: HttpClient) {
  }

  refreshAccessToken(refreshToken: string): Observable<any> {
    return this.http.post(this.refreshTokenEndpoint, {refreshToken});
  }

}



