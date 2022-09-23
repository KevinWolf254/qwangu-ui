import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { MainComponent } from './shared/main/main.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    component: SignInComponent
  },
  {
    path: 'reset',
    component: ForgotPasswordComponent
  },
  {
    path: 'set-password',
    component: SetPasswordComponent
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'users',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: 'user-roles',
        loadChildren: () => import('./user-role/user-role.module').then(m => m.UserRoleModule)
      },
      {
        path: 'apartments',
        loadChildren: () => import('./apartment/apartment.module').then(m => m.ApartmentModule)
      },
      {
        path: 'units',
        loadChildren: () => import('./unit/unit.module').then(m => m.UnitModule)
      },
      {
        path: 'tenants',
        loadChildren: () => import('./tenant/tenant.module').then(m => m.TenantModule)
      },
      {
        path: 'occupations',
        loadChildren: () => import('./occupation/occupation.module').then(m => m.OccupationModule)
      },
      {
        path: 'rent-advances',
        loadChildren: () => import('./rent-advance/rent-advance.module').then(m => m.RentAdvanceModule)
      },
      {
        path: 'notices',
        loadChildren: () => import('./notice/notice.module').then(m => m.NoticeModule)
      },
      {
        path: 'payments',
        loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
