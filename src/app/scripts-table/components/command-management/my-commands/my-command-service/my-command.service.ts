import {Injectable} from '@angular/core';
import {APP_CONFIG} from "../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Subject} from "rxjs";
import {CommandForTableDTO} from "../../../../interfaces/command.model";

@Injectable({
  providedIn: 'root'
})
export class MyCommandService {
  private baseUrl = APP_CONFIG.apiBaseUrl;
  private _myCommands$: Subject<CommandForTableDTO[]> = new BehaviorSubject<CommandForTableDTO[]>([]);

  constructor(
    private http: HttpClient) {
    this.getMyCommands();
  }

  get myCommands$() {
    return this._myCommands$.asObservable();
  }

  getMyCommands() {
    this.http.get<any>(`${this.baseUrl}/api/commands/mine/`).subscribe(
      (res: CommandForTableDTO[]) => {
        this._myCommands$.next(res);
      }
    )
  }


}
