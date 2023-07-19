import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {APP_CONFIG} from "../../../environments/environment";
import {CommandCreateRequest} from "../interfaces/commandCreateRequest.model";
import {CommandEditInfoDTO} from "../interfaces/CommandEditInfoDTO";
import {CommandEditRequest} from "../interfaces/commandEditRequest.model";
import {marketPlaceCommandDTO} from "../interfaces/MarketPlaceCommandDTO";


@Injectable({
  providedIn: 'root'
})
export class CommandService {

  baseUrl = APP_CONFIG.apiBaseUrl;


  constructor(
    private http: HttpClient) {
  }


  getMyCommands(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/commands/mine/`);
  }


  searchCommand(search: string) {
    return this.http.get<any>(`${this.baseUrl}/api/commands/public/`)
      .pipe(
        map((res: any) => {
          return res.filter((item: any) => {
            return item.name.toLowerCase().includes(search.toLowerCase())
              || item.description.toLowerCase().includes(search.toLowerCase())
              || item.owner.toLowerCase().includes(search.toLowerCase())
          });
        })
      );
  }

  createCommand(command: CommandCreateRequest) {
    const formData = new FormData();
    formData.append('name', command.name);
    formData.append('description', command.description);
    formData.append('state', command.visibility || '');

    if (command.icon) {
      formData.append('icon', command.icon);
    }

    for (let i = 0; i < command.parameters.length; i++) {
      if (!(command.parameters[i].name && command.parameters[i].type)) {
        continue;
      }
      formData.append(`parameters[${i}]`, JSON.stringify(command.parameters[i]));
    }

    for (let i = 0; i < command.patterns.length; i++) {
      if (!command.patterns[i]) {
        continue;
      }
      formData.append(`patterns[${i}]`, JSON.stringify({syntax: command.patterns[i]}));
    }

    formData.append('script_data.scriptType', command.script_data.scriptType);
    formData.append('script_data.script', command.script_data.script);
    formData.append('script_data.requirements', command.script_data.requirements);

    return this.http.post(`${this.baseUrl}/api/commands/`, formData);
  }

  getCommandDetails(id: number): Observable<CommandEditInfoDTO> {
    return this.http.get<CommandEditInfoDTO>(`${this.baseUrl}/api/commands/${id}/`)
  }

  editCommand(command: CommandEditRequest) {
    const formData = new FormData();

    if (command.name) {
      formData.append('name', command.name);
    }

    if (command.description) {

      formData.append('description', command.description);
    }

    if (command.visibility) {
      formData.append('state', command.visibility || '');
    }

    if (command.icon) {
      formData.append('icon', command.icon);
    }

    if (command.parameters) {
      for (let i = 0; i < command.parameters.length; i++) {
        if (!(command.parameters[i].name && command.parameters[i].type)) {
          continue;
        }
        formData.append(`parametersX[${i}]`, JSON.stringify(command.parameters[i]));
      }
    }

    if (command.patterns) {

      for (let i = 0; i < command.patterns.length; i++) {
        if (!command.patterns[i]) {
          continue;
        }
        formData.append(`patternsX[${i}]`, JSON.stringify({syntax: command.patterns[i]}));
      }
    }

    if (command.script_data) {
      formData.append('script_dataX.scriptType', command.script_data.scriptType);
      formData.append('script_dataX.script', command.script_data.script);
      formData.append('script_dataX.requirements', command.script_data.requirements);
    }

    return this.http.put(`${this.baseUrl}/api/commands/${command.id}/`, formData);
  }

  getMarketplaceCommands() {
    return this.http.get<marketPlaceCommandDTO[]>(`${this.baseUrl}/api/commands/public/`);
  }

  installCommand(id: number) {
    return this.http.get<{ id: number, name: string, executable_url: string }>(
      `${this.baseUrl}/api/commands/${id}/install/`);
  }

  deleteCommand(id: number) {
    return this.http.delete(`${this.baseUrl}/api/commands/${id}/`);
  }

  uninstallCommand(id: number) {
    return this.http.delete(`${this.baseUrl}/api/commands/${id}/uninstall/`);
  }

  forkCommand(id) {
    return this.http.post(`${this.baseUrl}/api/commands/${id}/fork/`, {});
  }
}
