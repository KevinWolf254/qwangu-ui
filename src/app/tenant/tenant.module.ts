import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantRoutingModule } from './tenant-routing.module';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TenantListComponent
  ],
  imports: [
    CommonModule,
    TenantRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TenantModule { }
