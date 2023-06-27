import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {APP_CONFIG} from "../../../environments/environment";
import {CommandCreateRequest} from "../interfaces/commandCreateRequest.model";
import {CommandEditInfoDTO} from "../interfaces/CommandEditInfoDTO";


@Injectable({
  providedIn: 'root'
})
export class CommandService {

  baseUrl = APP_CONFIG.apiBaseUrl;


  constructor(private http: HttpClient) {
  }


  getCommands() {
    return this.http.get<any>('assets/commands.json')
      .pipe(map((res: any) => {
        return res.data;
      }));
  }

  getUserCommands() {
    return this.http.get<any>('assets/my-commands.json')
      .pipe(map((res: any) => {
        return res.data;
      }));
  }


  searchCommand(search: string) {
    return this.http.get<any>('assets/commands.json')
      .pipe(map((res: any) => {
        return res.data.filter((item: any) => {

          return item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()) || item.owner.toLowerCase().includes(search.toLowerCase()) || item.commands.toLowerCase().includes(search.toLowerCase()) || item.status.toLowerCase().includes(search.toLowerCase()) || item.script.toLowerCase().includes(search.toLowerCase());
        });
      }));
  }


  createCommand(command: CommandCreateRequest) {
    const formData = new FormData();
    formData.append('name', command.name);
    formData.append('description', command.description);
    formData.append('visibility', command.visibility || '');

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
}
