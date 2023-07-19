import {Injectable} from '@angular/core';
import {io} from "socket.io-client";
import {AuthService} from "../../../../auth/services/auth-service/auth.service";

@Injectable()
export class RasaSocketService {
  private socket: any;

  constructor(private authService: AuthService) {
  }

  connect() {
    this.authService.getUserRasaPort().subscribe((data) => {
      console.log("Connecting to Socket.io server " + data.port);
      this.socket = io(`http://localhost:${data.port}`);
      this.socket.on('connect', function () {
        console.log("Connected to Socket.io server");
      });

      this.socket.on('connect_error', (error) => {
        console.error(error);
      });
    });
  }

  sendMessage(message: string) {
    this.socket.emit('user_uttered', {
      message: message
    });
  }

  receiveMessage(callback: any) {
    this.socket.on('bot_uttered', (data: any) => {
      callback(data);
    });
  }
}
