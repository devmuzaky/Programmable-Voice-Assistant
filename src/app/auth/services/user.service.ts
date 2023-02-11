import {Injectable} from '@angular/core';
import {APP_CONFIG} from "../../../environments/environment";


const API_URL = APP_CONFIG.apiBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }
}
