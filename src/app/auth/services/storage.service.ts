import {Injectable} from '@angular/core';
import {User} from "../interface/user";

const USER = "user";
const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {
  }

  cleanStorage(): void {
    window.localStorage.removeItem(USER);
    window.localStorage.removeItem(ACCESS_TOKEN);
    window.localStorage.removeItem(REFRESH_TOKEN);
    window.localStorage.removeItem('google-token');
  }

  public saveUser(user: User): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.localStorage.getItem(USER);
    return !!user;

  }

  saveAccessToken(access_token: string) {
    window.localStorage.removeItem(ACCESS_TOKEN);
    window.localStorage.setItem(ACCESS_TOKEN, access_token);
  }

  getAccessToken(): string {
    return window.localStorage.getItem(ACCESS_TOKEN) || '';
  }

  setRefreshToken(refresh_token: string) {
    window.localStorage.removeItem(REFRESH_TOKEN);
    window.localStorage.setItem(REFRESH_TOKEN, refresh_token);
  }

  getRefreshToken(): string {
    return window.localStorage.getItem(REFRESH_TOKEN) || '';
  }
}
