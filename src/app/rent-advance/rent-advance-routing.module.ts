import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RentAdvanceListComponent } from './rent-advance-list/rent-advance-list.component';

const routes: Routes = [
  {
    path: '',
    component: RentAdvanceListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentAdvanceRoutingModule { }
