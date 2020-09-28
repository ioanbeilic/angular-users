import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartialUpdateComponent } from './partial-update/partial-update.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: { breadcrumb: 'Users' },
  },
  {
    path: ':id',
    component: PartialUpdateComponent,
    data: { breadcrumb: 'Edit' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
