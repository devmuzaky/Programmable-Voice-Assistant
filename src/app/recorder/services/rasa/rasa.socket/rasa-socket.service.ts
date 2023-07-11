import {Injectable} from '@angular/core';
import {io} from "socket.io-client";

@Injectable()
export class RasaSocketService {
  private readonly socket: any;

  constructor() {
    this.socket = io('http://localhost:5005');

    this.socket.on('connect', function () {
      console.log("Connected to Socket.io server");
    });

    this.socket.on('connect_error', (error) => {
      console.error(error);
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
