import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApartmentRoutingModule } from './apartment-routing.module';
import { ApartmentListComponent } from './apartment-list/apartment-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ApartmentListComponent
  ],
  imports: [
    CommonModule,
    ApartmentRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ApartmentModule { }
