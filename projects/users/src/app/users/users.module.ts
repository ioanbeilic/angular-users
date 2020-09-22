import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { UsersListComponent } from './users-list/users-list.component';
import { UserComponent } from './user/user.component';
import { UserOptionsComponent } from './user-options/user-options.component';

@NgModule({
  declarations: [
    UserComponent,
    UsersComponent,
    UsersListComponent,
    UserOptionsComponent,
  ],
  imports: [CommonModule, UsersRoutingModule, MaterialModule, MatIconModule],
})
export class UsersModule {}
