import {Injectable} from '@angular/core';
import {UserLogin} from '../interface/userLogin';
import {UserSignUp} from '../interface/userSignUp';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {APP_CONFIG} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = APP_CONFIG.apiBaseUrl + '/users';

  isUserLoggedIn = false;

  constructor(private http: HttpClient) {
  }


  login(user: UserLogin) {
    return this.http.post(`${this.baseUrl}/login/`, user);
  }

  signUp(newUser: UserSignUp): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/`, newUser);
  }

  logout(): Observable<any> | any {
    this.isUserLoggedIn = false;
    localStorage.setItem('isUserLoggedIn', 'false');
  }

}
