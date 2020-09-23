import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { IUser } from '../user.interface';
import { UserService } from '../user.service';
import { UserComponent } from '../user/user.component';

const ELEMENT_DATA: IUser[] = [
  { id: 1, name: 'aaa', alias: 'AAA', email: 'aa@aaa.com', date: new Date() },
  { id: 2, name: 'aab', alias: 'AAb', email: 'ab@aaa.com', date: new Date() },
  { id: 3, name: 'abc', alias: 'Abc', email: 'ac@aaa.com', date: new Date() },
  { id: 4, name: 'aaa', alias: 'AAA', email: 'aa@aaa.com', date: new Date() },
  { id: 5, name: 'aaa', alias: 'AAA', email: 'aa@aaa.com', date: new Date() },
];

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'alias',
    'email',
    'date',
    'actions',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  selectedId: number = 1;
  selectedUser: IUser;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.selectUser(ELEMENT_DATA[0]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectUser(user: IUser) {
    this.selectedId = user.id;
    this.selectedUser = user;
    // this.userService.selectedUser(user);
  }

  /**
   * angular material standard dialog
   * on dialogRef variable data send data to dialog, all data must be passed here as e empty variable
   * on dialogRef.afterClosed() the result return data from dialog, eho populate the variable passed before
   */

  userInfoDialog() {
    console.log('in user info');
    const dialogRef = this.dialog.open(UserInfoComponent, {
      width: '70vw',
      height: '70vh',
      data: this.selectedUser,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.selectedUser = result;
    });
  }

  /**
   * angular material standard dialog
   * on dialogRef variable data send data to dialog, all data must be passed here as e empty variable
   * on dialogRef.afterClosed() the result return data from dialog, eho populate the variable passed before
   */

  userEditDialog(): void {
    const dialogRef = this.dialog.open(UserComponent, {
      width: '70vw',
      height: '70vh',
      data: this.selectedUser,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.selectedUser = result;
    });
  }

  /**
   * angular material standard dialog
   * on dialogRef variable data send data to dialog, all data must be passed here as e empty variable
   * on dialogRef.afterClosed() the result return data from dialog, eho populate the variable passed before
   */

  userChangePasswordDialog(): void {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      data: this.selectedUser,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.selectedUser = result;
    });
  }

  /**
   * angular material standard dialog
   * on dialogRef variable data send data to dialog, all data must be passed here as e empty variable
   * on dialogRef.afterClosed() the result return data from dialog, eho populate the variable passed before
   * in this case btnPressed is the button pressed on modal who contain a yes o no value to delete fields
   */

  userDeleteDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'delete user',
        icon: 'delete',
        type: 'danger',
        btnPresses: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');

      // openSnackBar(result.message);

      this.snackBar.open('datos borados', result.action, {
        duration: 2000,
        panelClass: ['mat-toolbar', 'toast-success'],
        verticalPosition: 'top',
      });
    });
  }
}
