import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUser } from '../user.interface';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.scss'],
})
export class UserOptionsComponent implements OnInit, OnDestroy {
  user: IUser;
  userSubscription: Subscription;

  constructor(private userService: UserService) {
    this.userSubscription = this.userService.user.subscribe((res: IUser) => {
      console.log(res);
      this.user = res;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
