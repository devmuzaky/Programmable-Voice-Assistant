import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from "rxjs";
import {Command} from "../interfaces/command.model";
import {CommandCreateRequest} from "../interfaces/commandCreateRequest.model";
import {APP_CONFIG} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class CommandService {

  baseUrl = APP_CONFIG.apiBaseUrl + '/users';


  constructor(private http: HttpClient) {
    console.log('CommandService constructor')
  }


  getCommands() {
    return this.http.get<any>('assets/commands.json')
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  getFiles() {
    return this.http.get('assets/commands.json');
  }

  searchCommand(search: string) {
    return this.http.get<any>('assets/commands.json')
      .pipe(
        map((res: any) => {
          return res.data.filter((item: any) => {

            return item.name.toLowerCase().includes(search.toLowerCase())
              || item.description.toLowerCase().includes(search.toLowerCase())
              || item.owner.toLowerCase().includes(search.toLowerCase())
              || item.commands.toLowerCase().includes(search.toLowerCase())
              || item.status.toLowerCase().includes(search.toLowerCase())
              || item.script.toLowerCase().includes(search.toLowerCase());
          });
        })
      );
  }


  createCommand(command: CommandCreateRequest) {
    return this.http.post(`${this.baseUrl}/api/commands/`, command);
  }


}
