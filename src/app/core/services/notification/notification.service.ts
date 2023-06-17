import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

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
      console.log('Received notification:', notification);
      // TODO: Handle the received notification here
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
}
