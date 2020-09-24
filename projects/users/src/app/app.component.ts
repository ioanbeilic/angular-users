import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISnackBarData } from './shared/interfaces/snackbar.interface';
import { NotificationService } from './shared/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'users';
}
