import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../shared/interfaces/user.interface';
import { NotificationService } from '../../shared/services/notification.service';
import { UserService } from '../user.service';
import { UserComponent } from '../user/user.component';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-partial-update',
  templateUrl: './partial-update.component.html',
  styleUrls: ['./partial-update.component.scss'],
})
export class PartialUpdateComponent implements OnInit {
  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute
  ) {
    // todo  change to async await to load modal
    this.route.params.subscribe((params) => {
      const id = params['id'];
      console.log(params);
      this.userService.getUser(id).subscribe((res) => {
        let user: IUser = res;

        const dialogRef = this.dialog.open(UserComponent, {
          data: {
            user,
            disabled: false,
            userUpdate: true,
            title: 'Edit Account',
          },
        });
        dialogRef.afterClosed().subscribe(() => {
          this.location.back();
        });
      });
    });
  }

  ngOnInit(): void {}
}
