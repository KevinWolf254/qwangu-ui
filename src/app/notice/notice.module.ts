import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticeRoutingModule } from './notice-routing.module';
import { NoticeListComponent } from './notice-list/notice-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NoticeListComponent
  ],
  imports: [
    CommonModule,
    NoticeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NoticeModule { }
