import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OccupationRoutingModule } from './occupation-routing.module';
import { OccupationListComponent } from './occupation-list/occupation-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OccupationListComponent
  ],
  imports: [
    CommonModule,
    OccupationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OccupationModule { }
