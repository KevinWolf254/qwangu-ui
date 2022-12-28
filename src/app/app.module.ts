import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SetPasswordComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    NgbModule,
    FormsModule,
    RouterModule,
    SharedModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(), // ToastrModule added,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
