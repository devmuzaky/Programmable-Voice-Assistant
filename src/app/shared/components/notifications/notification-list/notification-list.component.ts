import {Component, NgZone, OnInit} from '@angular/core';
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
      status: 'success',
    },
    {
      id: 2,
      message: 'New order has been received',
      status: 'fail',
    },
    {
      id: 3,
      message: 'New order has been received',
      status: 'pending',
    },

  ];

  constructor(
    private notificationService: NotificationService,
    private storageService: StorageService,
    private snackbarService: SnackbarService,
    private zone: NgZone
  ) {
    if (this.storageService.isLoggedIn()) {
      console.log(this.storageService.getUser())
      this.notificationService.connect(this.storageService.getUser().pk);
    }
  }

  ngOnInit(): void {
    this.notificationService.getNotificationObservable().subscribe(
      (notification) => {
        console.log('Notification received:', notification);

        // TODO: modify this to new style
        this.snackbarService.openNotificationSnackBar(notification);

        this.notificationList = [...this.notificationList, notification];

        this.zone.run(() => {
          //   fix for delay re-rendering in electron
        });
      }
    );
  }

}
