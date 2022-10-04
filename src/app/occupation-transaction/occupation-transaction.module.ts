import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OccupationTransactionRoutingModule } from './occupation-transaction-routing.module';
import { OccupationTransactionListComponent } from './occupation-transaction-list/occupation-transaction-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OccupationTransactionListComponent
  ],
  imports: [
    CommonModule,
    OccupationTransactionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OccupationTransactionModule { }
