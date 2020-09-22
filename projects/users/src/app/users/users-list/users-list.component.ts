import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from '../user.interface';

const ELEMENT_DATA: IUser[] = [
  { name: 'aaa', alias: 'AAA', email: 'aa@aaa.com', date: new Date() },
  { name: 'aaa', alias: 'AAA', email: 'aa@aaa.com', date: new Date() },
  { name: 'aaa', alias: 'AAA', email: 'aa@aaa.com', date: new Date() },
  { name: 'aaa', alias: 'AAA', email: 'aa@aaa.com', date: new Date() },
  { name: 'aaa', alias: 'AAA', email: 'aa@aaa.com', date: new Date() },
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

  constructor() {}

  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
