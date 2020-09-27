import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { ISnackBarData } from '../../shared/interfaces/snackbar.interface';
import { NotificationService } from '../../shared/services/notification.service';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { IUser } from '../../shared/interfaces/user.interface';
import { UserService } from '../user.service';
import { UserComponent } from '../user/user.component';

const ELEMENT_DATA: IUser[] = [
  {
    id: 1,
    name: 'aaa',
    alias: 'AAA',
    email: 'aa@aaa.com',
    status: true,
    departments: ['administrator', 'user'],
    userType: 'demo',
    privileges: ['read', 'write', 'delete'],
    date: new Date(),
  },
  {
    id: 2,
    name: 'aab',
    alias: 'AAb',
    email: 'ab@aaa.com',
    departments: ['administrator', 'user'],
    userType: 'demo',
    privileges: ['read', 'write', 'delete'],
    status: true,
    date: new Date(),
  },
  {
    id: 3,
    name: 'abc',
    alias: 'Abc',
    email: 'ac@aaa.com',
    departments: ['administrator', 'user'],
    userType: 'demo',
    privileges: ['read', 'write', 'delete'],
    status: true,
    date: new Date(),
  },
  {
    id: 4,
    name: 'aaa',
    alias: 'AAA',
    email: 'aa@aaa.com',
    departments: ['administrator', 'user'],
    userType: 'demo',
    privileges: ['read', 'write', 'delete'],
    status: false,
    date: new Date(),
  },
  {
    id: 5,
    name: 'aaa',
    alias: 'AAA',
    email: 'aa@aaa.com',
    departments: ['administrator', 'user'],
    userType: 'demo',
    privileges: ['read', 'write', 'delete'],
    status: true,
    date: new Date(),
  },
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

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private notificationService: NotificationService
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
    // this.userService.selectedUser(user);
  }

  /**
   * angular material standard dialog
   * on dialogRef variable data send data to dialog, all data must be passed here as e empty variable
   * on dialogRef.afterClosed() the result return data from dialog, eho populate the variable passed before
   */

  userInfoDialog(user: IUser) {
    console.log('in user info');
    const dialogRef = this.dialog.open(UserInfoComponent, {
      width: '70vw',
      height: '70vh',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      // this.selectedUser = result;
    });
  }

  /**
   * angular material standard dialog
   * on dialogRef variable data send data to dialog, all data must be passed here as e empty variable
   * on dialogRef.afterClosed() the result return data from dialog, eho populate the variable passed before
   */

  userEditDialog(user: IUser): void {
    const dialogRef = this.dialog.open(UserComponent, {
      width: '70vw',
      height: '70vh',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');

      console.log(result);
      // this.selectedUser = result;
    });
  }

  userNewDialog(): void {
    const dialogRef = this.dialog.open(UserComponent, {
      // data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');

      console.log(result);

      // lanch notification when update user from dialog
      // todo update the dom
    });
  }

  /**
   * angular material standard dialog
   * on dialogRef variable data send data to dialog, all data must be passed here as e empty variable
   * on dialogRef.afterClosed() the result return data from dialog, eho populate the variable passed before
   */

  userChangePasswordDialog(user: IUser): void {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');

      console.log(result);
      // this.selectedUser = result;
    });
  }

  /**
   * disable user
   *
   */

  userDisableConfirmation(event: MatSlideToggleChange, user: IUser): void {
    // crate a default dialog
    let data = {
      message: 'Enable selected user ?',
      icon: 'info',
      type: 'info',
      btnPress: false,
    };

    if (user.status == true) {
      // update default dialog id user is active
      data = {
        message: 'Disable selected user ?',
        icon: 'remove_circle',
        type: 'danger',
        btnPress: false,
      };
    }
    // load data to dialog
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      /**
       * if result btnPress is true, yes is pressed
       * remove the user
       */
      if (result) {
        // check if click out or cancel
        if (result.btnPress) {
          // yes is pressed
          // update user state
          user.status = !user.status;
          this.userService.updateUser(user).subscribe(
            (res) => {
              // if response from server is ok, update the button position
              event.source.checked = !user.status;
              // prepare the toast message
              const notificationData: ISnackBarData = {
                message: 'User Inactive',
                panelClass: ['toast-success'],
              };
              // lanch notification service
              this.notificationService.notification$.next(notificationData);
            },
            (error) => {
              // for server error return the same state
              event.source.checked = !user.status;
            }
          );
        }
      } else {
        event.source.checked = user.status;
      }

      // replace  with server response
    });
  }

  /**
   * angular material standard dialog
   * on dialogRef variable data send data to dialog, all data must be passed here as e empty variable
   * on dialogRef.afterClosed() the result return data from dialog, eho populate the variable passed before
   * in this case btnPressed is the button pressed on modal who contain a yes o no value to delete fields
   */

  userDeleteConfirmation(user: IUser): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Delete selected user ?',
        icon: 'delete_forever',
        type: 'danger',
        btnPress: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      /**
       * if result btnPress is true, yes is pressed
       * remove the user
       */
      if (result) {
        // check if click out or cancel
        if (result.btnPress) {
          // check if press yes
          this.userService.deleteUser(user.id).subscribe((res: IUser) => {
            const notificationData: ISnackBarData = {
              message: 'User Removed',
              panelClass: ['toast-success'],
            };

            this.notificationService.notification$.next(notificationData);
            // if server response success remove element directly form dom
            this.dataSource.data = this.dataSource.data.filter(
              (el) => el.id !== res.id
            );
          });
        }
      }
    });
  }
}
