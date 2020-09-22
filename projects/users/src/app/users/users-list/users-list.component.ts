import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from '../user.interface';
import { UserService } from '../user.service';

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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.selectUser(ELEMENT_DATA[0]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectUser(user: IUser) {
    this.selectedId = user.id;
    this.userService.selectedUser(user);
  }
}
