import {Injectable} from '@angular/core';
import {APP_CONFIG} from "../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {CommandForTableDTO} from "../../../../interfaces/command.model";

@Injectable({
  providedIn: 'root'
})
export class MyCommandService {
  private baseUrl = APP_CONFIG.apiBaseUrl;

  constructor(
    private http: HttpClient) {
    this.fetchMyCommands();
  }

  private _myCommands$: BehaviorSubject<CommandForTableDTO[]> = new BehaviorSubject<CommandForTableDTO[]>([]);

  get myCommands$() {
    return this._myCommands$.asObservable();
  }

  fetchMyCommands() {
    this.http.get<any>(`${this.baseUrl}/api/commands/mine/`).subscribe(
      (res: CommandForTableDTO[]) => {
        this._myCommands$.next(res);
      },
      error => {
        console.error(error);
      }
    )
  }

  updateCommandToPublic(id: number) {
    const commands: CommandForTableDTO[] = this._myCommands$.getValue();
    commands.forEach(
      (command) => {
        if (command.id === id) command.state = 'public';
      }
    );

    this._myCommands$.next(commands);
  }

  clearMyCommands() {
    this._myCommands$.next([]);
  }
}
