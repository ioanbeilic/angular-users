import { Component, OnInit } from '@angular/core';
import { IUser } from './user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  user: IUser;

  constructor() {}

  ngOnInit(): void {}
}
