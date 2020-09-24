import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISnackBarData } from '../shared/interfaces/snackbar.interface';
import { NotificationService } from '../shared/services/notification.service';
import { IUser } from './user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  user: IUser;

  constructor(
    private notificationService: NotificationService,
    private snackBar: MatSnackBar
  ) {
    this.notificationService.notification$.subscribe((data: ISnackBarData) => {
      this.snackBar.open(data.message, data.action, {
        duration: data.duration | 2000,
        panelClass: data.panelClass,
        verticalPosition: data.verticalPosition ? data.verticalPosition : 'top',
      });
    });
  }

  ngOnInit(): void {}
}
