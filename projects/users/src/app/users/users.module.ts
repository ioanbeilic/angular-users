import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { UsersListComponent } from './users-list/users-list.component';
import { UserComponent } from './user/user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ConfirmationDialogModule } from 'src/app/confirmation-dialog/confirmation-dialog.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PartialUpdateComponent } from './partial-update/partial-update.component'

@NgModule({
  declarations: [
    UserComponent,
    UsersComponent,
    UsersListComponent,
    UserInfoComponent,
    ResetPasswordComponent,
    PartialUpdateComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    MatIconModule,
    ConfirmationDialogModule,
      FormsModule,
      ReactiveFormsModule

  ],
  providers: [],
})
export class UsersModule {}
