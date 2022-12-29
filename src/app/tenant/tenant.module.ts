import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { TenantRoutingModule } from './tenant-routing.module';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    TenantListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    TenantRoutingModule,
    NgbPaginationModule
  ]
})
export class TenantModule { }
