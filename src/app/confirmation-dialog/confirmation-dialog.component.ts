import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'projects/users/src/app/shared/services/notification.service';

/**
 * data dialog
 * type danger, worningm succes,
 * this color must be difined on template
 */
export interface IDialogData {
  message: string;
  icon: string;
  type: string;
  btnPress: boolean;
}

/*
  message: 'delete user',
  icon: 'delete',
  type: 'danger',
  btnPresses: false,
*/

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  color: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) {
    this.color = `text-${this.data.type}`;
  }

  onNoClick(): void {
    this.data.btnPress = false;
    this.dialogRef.close();
  }
  onYesClick(): void {
    this.data.btnPress = true;
    this.dialogRef.close(this.data);
  }
}
