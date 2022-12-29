import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApartmentRoutingModule } from './apartment-routing.module';
import { ApartmentListComponent } from './apartment-list/apartment-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ApartmentListComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    ApartmentRoutingModule,
  ]
})
export class ApartmentModule { }
