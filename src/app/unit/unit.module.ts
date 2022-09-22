import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitRoutingModule } from './unit-routing.module';
import { UnitListComponent } from './unit-list/unit-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UnitListComponent
  ],
  imports: [
    CommonModule,
    UnitRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UnitModule { }
