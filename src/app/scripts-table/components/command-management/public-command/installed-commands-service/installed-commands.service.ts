import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {MarketPlaceCommandDTO} from "../../../../interfaces/MarketPlaceCommandDTO";
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

  private _installedCommands$: Subject<MarketPlaceCommandDTO[]> = new BehaviorSubject<MarketPlaceCommandDTO[]>([]);

  get installedCommands$(): Observable<MarketPlaceCommandDTO[]> {
    return this._installedCommands$.asObservable();
  }

  getInstalledCommands() {
    return this.http.get<MarketPlaceCommandDTO[]>(`${this.baseUrl}/api/commands/installed/`)
      .subscribe((res: MarketPlaceCommandDTO[]) => {
        this._installedCommands$.next(res);
      });
  }
}
