import {Injectable} from '@angular/core';
import {CommandNotification} from "../../../shared/components/notifications/interfaces/notification";
import {Observable, Subject} from "rxjs";
import {ElectronService} from "../electron/electron.service";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject: Subject<CommandNotification> = new Subject<CommandNotification>();
  private socket: WebSocket;

  constructor(private electronService: ElectronService) {
  }

  connect(user_id: number): void {
    const ws_url = `ws://localhost:8000/ws/notifications/${user_id}/`;
    this.socket = new WebSocket(ws_url);

    this.socket.onopen = (event) => {
      console.log('Notification connection opened.');
    };

    this.socket.onmessage = (event) => {
      console.log('Received message:', event.data)
      const notification = JSON.parse(event.data).notification;

      if (notification.status === 'success') {
        this.storeExecutableURl(notification.id, notification.name, notification.executable_url)
      }

      this.notificationSubject.next(notification);

    };

    this.socket.onclose = (event) => {
      console.log('Notification connection closed.');
    };

  }

  getNotificationObservable(): Observable<CommandNotification> {
    return this.notificationSubject.asObservable();
  }

  private storeExecutableURl(id: number, name: string, executable_url: string) {
    this.electronService.ipcRenderer.send('save_executable', id, name, executable_url);
  }
}
