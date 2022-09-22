import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentAdvanceRoutingModule } from './rent-advance-routing.module';
import { RentAdvanceListComponent } from './rent-advance-list/rent-advance-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RentAdvanceListComponent
  ],
  imports: [
    CommonModule,
    RentAdvanceRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RentAdvanceModule { }
