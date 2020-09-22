import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IUser } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = new Subject<IUser>();

  constructor() {}

  selectedUser(user: IUser) {
    this.user.next(user);
  }

  private save() {
    console.log('user updated');
    // save the user
  }
}
