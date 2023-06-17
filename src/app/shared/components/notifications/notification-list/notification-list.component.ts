import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../../../core/services/notification/notification.service";
import {StorageService} from "../../../../auth/services/storage.service";
import {SnackbarService} from "../../../snackbar-service/snackbar.service";

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  notificationList = [
    {
      id: 1,
      message: 'New order has been received',
      time: '3 min ago',
    },
    {
      id: 2,
      message: 'New order has been received',
      time: '3 min ago',
    },
    {
      id: 3,
      message: 'New order has been received',
      time: '3 min ago',
    },

  ];

  constructor(
    private notificationService: NotificationService,
    private storageService: StorageService,
    private snackbarService: SnackbarService,
  ) {
    if (this.storageService.isLoggedIn()) {
      console.log(this.storageService.getUser())
      this.notificationService.connect(this.storageService.getUser().pk);
    }
  }

  ngOnInit(): void {
  }

}
