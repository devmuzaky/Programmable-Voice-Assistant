import {Injectable} from '@angular/core';
import {delay, of, tap} from "rxjs";
import {UserLogin} from "../interface/userLogin";
import {UserSignUp} from "../interface/userSignUp";
import {log} from "util";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUserLoggedIn: boolean = false;

  constructor() {
  }

  login(user: UserLogin) {
    this.isUserLoggedIn = user.userName == 'admin' && user.password == 'admin';
    localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");

    return of(this.isUserLoggedIn).pipe(
      delay(1000),
      tap(val => {
        console.log("Is User Authentication is successful: " + val);
      })
    );
  }

  signUp(newUser: UserSignUp) {
    return console.log("User is signed up successfully");

  }

  logout() {
    this.isUserLoggedIn = false;
    localStorage.setItem('isUserLoggedIn', "false");
  }

}
