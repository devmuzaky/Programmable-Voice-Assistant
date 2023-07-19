import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {marketPlaceCommandDTO} from "../../../../interfaces/MarketPlaceCommandDTO";
import {HttpClient} from "@angular/common/http";
import {APP_CONFIG} from "../../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class InstalledCommandsService {
  private baseUrl = APP_CONFIG.apiBaseUrl;

  constructor(private http: HttpClient) {
    this.getInstalledCommands();
  }

  private _installedCommands$: Subject<marketPlaceCommandDTO[]> = new BehaviorSubject<marketPlaceCommandDTO[]>([]);

  get installedCommands$(): Observable<marketPlaceCommandDTO[]> {
    return this._installedCommands$.asObservable();
  }

  getInstalledCommands() {
    return this.http.get<marketPlaceCommandDTO[]>(`${this.baseUrl}/api/commands/installed/`)
      .subscribe((res: marketPlaceCommandDTO[]) => {
        this._installedCommands$.next(res);
      });
  }

  clearInstalledCommands() {
    this._installedCommands$.next([]);
  }

}
