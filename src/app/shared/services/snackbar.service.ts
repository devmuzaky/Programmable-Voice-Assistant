import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string = 'Dismiss', duration: number = 3000) {
    console.log('openSnackBar: ', message)
    this.snackBar.open(message, action, {
      duration,
    } );
  }
}
