import { MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export interface ISnackBarData {
  message: string;
  action?: string;
  duration?: number;
  panelClass?: string[];
  verticalPosition?: 'top' | 'bottom';
}
