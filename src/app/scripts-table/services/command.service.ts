import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from "rxjs";
import {Command} from "../interfaces/command.model";

@Injectable({
  providedIn: 'root'
})
export class CommandService {

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


  createCommand(command: Command) {
    return this.http.post('/api/commands', command);
  }


  uploadIcon(file: any) {

  }

  updateCommand(command: Command) {

  }

  deleteCommand(id: number) {

  }


}
