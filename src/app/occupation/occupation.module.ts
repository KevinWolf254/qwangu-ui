import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OccupationRoutingModule } from './occupation-routing.module';
import { OccupationListComponent } from './occupation-list/occupation-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    OccupationListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
    OccupationRoutingModule,
  ]
})
export class OccupationModule { }
