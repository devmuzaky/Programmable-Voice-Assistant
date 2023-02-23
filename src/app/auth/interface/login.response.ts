import {AuthUser} from "./auth.user";

export interface LoginResponse {
  "access_token": string,
  "refresh_token": string,
  "user": AuthUser
}
