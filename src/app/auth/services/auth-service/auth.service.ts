import {Injectable} from '@angular/core';
import {UserLogin} from '../../interface/userLogin';
import {UserSignUp} from '../../interface/userSignUp';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {APP_CONFIG} from "../../../../environments/environment";
import {StorageService} from "../storage.service";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = APP_CONFIG.apiBaseUrl + '/users';

  private isUserLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private storageService: StorageService, private router: Router) {
    this.isUserLoggedIn$.next(this.storageService.isLoggedIn());
  }

  get isUserLoggedIn(): Observable<boolean> {
    return this.isUserLoggedIn$.asObservable();
  }

  login(user: UserLogin) {
    return this.http.post(`${this.baseUrl}/login/`, user);
  }

  signUp(newUser: UserSignUp): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/`, newUser);
  }

  logout(): Observable<any> | any {
    this.isUserLoggedIn$.next(false);
    this.storageService.clean();
    this.router.navigate(['/recorder']);
  }

  setLoggedIn(loggedIn: boolean) {
    this.isUserLoggedIn$.next(loggedIn);
  }

  getUserId() {
    return this.storageService.getUser().pk;
  }
}
