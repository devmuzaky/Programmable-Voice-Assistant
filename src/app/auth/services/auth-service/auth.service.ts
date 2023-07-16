import {Injectable} from '@angular/core';
import {UserLogin} from '../../interface/userLogin';
import {UserSignUp} from '../../interface/userSignUp';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {APP_CONFIG} from "../../../../environments/environment";
import {StorageService} from "../storage.service";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = APP_CONFIG.apiBaseUrl + '/users';
  newUserSubject: Subject<boolean> = new Subject<boolean>()

  private isUserLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router) {
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
    this.storageService.cleanStorage();
    this.router.navigate(['/home-page']);
  }

  setLoggedIn(isLoggedIn: boolean): void {
    this.isUserLoggedIn$.next(isLoggedIn);
  }

  getUsername(): string {
    return this.storageService.getUser().username;
  }

  getUserRasaPort(): Observable<{ port: number }> {
    return this.http.get<{ port: number }>(`${this.baseUrl}/rasa/port/${this.storageService.getUser().pk}`)
  }
}
