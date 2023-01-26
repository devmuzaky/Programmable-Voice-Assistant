import {Injectable} from '@angular/core';
import {delay, of, tap} from 'rxjs';
import {UserLogin} from '../interface/userLogin';
import {UserSignUp} from '../interface/userSignUp';
import {log} from 'util';
import {HttpClient} from "@angular/common/http";
import {APP_CONFIG} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUserLoggedIn = false;

  constructor(private http: HttpClient) {
  }


  login(user: UserLogin) {
    // this.isUserLoggedIn = user.userName === 'admin' && user.password === 'admin';
    // localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? 'true' : 'false');

    return this.http.post(APP_CONFIG.apiBaseUrl + 'login', user);
  }

  signUp(newUser: UserSignUp) {
    return this.http.post(APP_CONFIG.apiBaseUrl + 'signup', newUser);
  }

  logout() {
    this.isUserLoggedIn = false;
    localStorage.setItem('isUserLoggedIn', 'false');
  }

}
