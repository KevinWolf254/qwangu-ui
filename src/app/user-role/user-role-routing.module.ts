import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRoleListComponent } from './user-role-list/user-role-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserRoleListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoleRoutingModule { }
