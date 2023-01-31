import {Injectable} from '@angular/core';
import {UserLogin} from '../interface/userLogin';
import {UserSignUp} from '../interface/userSignUp';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {APP_CONFIG} from "../../../environments/environment";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUserLoggedIn = false;

  constructor(private http: HttpClient) {
  }


  login(user: UserLogin) {
    return this.http.post("/api/" + 'token/', user);
  }

  signUp(newUser: UserSignUp): Observable<any>  {
    console.log(newUser);
    return this.http.post("/api/" + '', newUser);
  }

  logout(): Observable<any> | any {
    this.isUserLoggedIn = false;
    localStorage.setItem('isUserLoggedIn', 'false');
    // return this.http.post(APP_CONFIG.apiBaseUrl + 'signout', { });
  }

}
