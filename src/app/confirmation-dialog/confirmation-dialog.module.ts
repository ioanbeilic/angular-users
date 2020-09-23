import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MaterialModule } from '../material.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [CommonModule, MaterialModule, MatIconModule],
  exports: [ConfirmationDialogComponent],
})
export class ConfirmationDialogModule {}
