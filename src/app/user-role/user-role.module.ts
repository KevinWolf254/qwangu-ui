import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoleRoutingModule } from './user-role-routing.module';
import { UserRoleListComponent } from './user-role-list/user-role-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserRoleListComponent
  ],
  imports: [
    CommonModule,
    UserRoleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserRoleModule { }
