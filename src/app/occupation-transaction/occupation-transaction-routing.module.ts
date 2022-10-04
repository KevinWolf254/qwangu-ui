import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OccupationTransactionListComponent } from './occupation-transaction-list/occupation-transaction-list.component';

const routes: Routes = [
  {
    path: '',
    component: OccupationTransactionListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OccupationTransactionRoutingModule { }
