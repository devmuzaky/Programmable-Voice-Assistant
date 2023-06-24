import {Injectable} from '@angular/core';
import {CommandNotification} from "../../../shared/components/notifications/interfaces/notification";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject: Subject<CommandNotification> = new Subject<CommandNotification>();
  private socket: WebSocket;

  constructor() {
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

      if(notification.status === 'success') {
        //TODO: download the executable file
      }

      this.notificationSubject.next(notification);

    };

    this.socket.onclose = (event) => {
      console.log('Notification connection closed.');
    };

  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  getNotificationObservable(): Observable<CommandNotification> {
    return this.notificationSubject.asObservable();
  }
}
