import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { RequiredRolesDirective } from './directives/required-roles.directive';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { RouterModule } from '@angular/router';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { ErrorResponseInterceptor } from './interceptors/error-response.interceptor';

@NgModule({
  declarations: [
    MainComponent,
    RequiredRolesDirective,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [RequiredRolesDirective],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorResponseInterceptor, multi: true },
  ],
})
export class SharedModule { }
