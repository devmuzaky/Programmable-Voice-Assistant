import {Injectable} from '@angular/core';
import {CommandNotification} from "../../../shared/components/notifications/interfaces/notification";
import {Observable, Subject} from "rxjs";
import {ElectronService} from "../electron/electron.service";
import {
  MyCommandService
} from "../../../scripts-table/components/command-management/my-commands/my-command-service/my-command.service";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject: Subject<CommandNotification> = new Subject<CommandNotification>();
  private socket: WebSocket;
  private rasa_socket: WebSocket;


  constructor(
    private electronService: ElectronService,
    private myCommandService: MyCommandService
  ) {
  }

  connect(userID: number): void {
    const wsURL = `ws://localhost:8000/ws/notifications/${userID}/`;
    this.socket = new WebSocket(wsURL);

    this.socket.onopen = (event) => {
      console.log('Notification connection opened.');
    };

    this.socket.onmessage = (event) => {
      console.log('Received message:', event.data)
      const notification = JSON.parse(event.data).notification;
      if (notification.type && notification.type === 'approved') {
        this.myCommandService.updateToPublic(notification.id);
        return;
      }
      if (notification.status === 'success') {
        this.storeExecutableURl(notification.id, notification.name, notification.executable_url)
      }

      this.notificationSubject.next(notification);

    };

    this.socket.onclose = (event) => {
      console.log('Notification connection closed.');
    };

  }

  rasaConnect(userID: number): void {
    const wsURL = `ws://localhost:8000/ws/rasa/notifications/${userID}/`;
    this.rasa_socket = new WebSocket(wsURL);
    this.rasa_socket.onopen = (event) => {
      console.log('Rasa Notification connection opened.');
    };

    this.rasa_socket.onmessage = (event) => {
      console.log('Rasa Received message:', event.data)
      const notification = JSON.parse(event.data).notification;
      this.notificationSubject.next(notification);
    };

    this.rasa_socket.onclose = (event) => {
      console.log('Rasa Notification connection closed.');
    };
  }

  getNotificationObservable(): Observable<CommandNotification> {
    return this.notificationSubject.asObservable();
  }

  private storeExecutableURl(id: number, name: string, executable_url: string) {
    this.electronService.ipcRenderer.send('save_executable', id, name, executable_url);
  }
}
