import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommandNotification, EmptyCommandNotification} from "../interfaces/notification";

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss']
})
export class NotificationCardComponent  {
  @Input() notification: CommandNotification = EmptyCommandNotification;
  @Output() onNotificationClick: EventEmitter<CommandNotification> = new EventEmitter<CommandNotification>();

}
