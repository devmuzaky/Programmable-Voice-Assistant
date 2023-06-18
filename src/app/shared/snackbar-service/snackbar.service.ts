import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CommandNotification} from "../components/notifications/interfaces/notification";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {
  }

  openSnackBar(message: string, action: string = 'Dismiss', duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration,
      panelClass: ['general-snackbar']
    });
  }

  openNotificationSnackBar(notification: CommandNotification) {
    if (notification.status === 'success') {
      this.snackBar.open(notification.message, 'Dismiss', {
        duration: 3000,
        panelClass: ['snackbar-success'],
        verticalPosition: 'top'
      });
    }
    if (notification.status === 'fail') {
      this.snackBar.open(notification.message, 'Dismiss', {
        duration: 3000,
        panelClass: ['snackbar-fail'],
        verticalPosition: 'top'
      });
    }

    if (notification.status === 'pending') {
      this.snackBar.open(notification.message, 'Dismiss', {
        duration: 3000,
        panelClass: ['snackbar-pending'],
        verticalPosition: 'top'
      });
    }
  }
}
