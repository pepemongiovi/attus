import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class MessageService {
  private msgSource   = new BehaviorSubject(null);
  private styleSource = new BehaviorSubject(null);

  msg   = this.msgSource.asObservable();
  style = this.styleSource.asObservable();

  constructor(private snackBar: MatSnackBar) { }

  showSimple(message) {
    this.snackBar.open(message, '', {
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      duration: 3000
    });
  }

  showSuccess(message) {
    this.snackBar.open(message, '', {
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      duration: 3000,
      panelClass: ['green-snackbar']
    });
  }

  showError(message) {
    this.snackBar.open(message, '', {
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      duration: 3000,
      panelClass: ['red-snackbar']
    });
  }

}
