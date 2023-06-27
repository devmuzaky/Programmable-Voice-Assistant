import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from "../../../../core/services/notification/notification.service";
import {StorageService} from "../../../../auth/services/storage.service";
import {SnackbarService} from "../../../snackbar-service/snackbar.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit, OnDestroy {


  notificationList = [];
  private notificationSub: Subscription;

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
    this.notificationSub = this.notificationService.getNotificationObservable().subscribe(
      (notification) => {
        console.log('Notification received:', notification);

        this.snackbarService.openNotificationSnackBar(notification);

        this.notificationList = this.notificationList.filter((item) => item.id !== notification.id);
        this.notificationList = [...this.notificationList, notification];

        this.zone.run(() => {
          // fix for delay re-rendering in electron
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.notificationSub.unsubscribe();
  }
}
