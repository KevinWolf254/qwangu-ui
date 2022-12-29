import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { UnitRoutingModule } from './unit-routing.module';
import { UnitListComponent } from './unit-list/unit-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    UnitListComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    UnitRoutingModule,
    NgbPaginationModule,
    ReactiveFormsModule,
  ]
})
export class UnitModule { }
