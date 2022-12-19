import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { SignedInGuard } from './shared/guards/signed-in.guard';
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
    canActivate: [SignedInGuard],
    // canActivateChild: [SignedInGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        data: { role: ['USER_READ'] },
        canActivate: [AuthGuard]
      },
      {
        path: 'user-roles',
        loadChildren: () => import('./user-role/user-role.module').then(m => m.UserRoleModule),
        data: { role: ['USER_ROLE_READ'] },
        canActivate: [AuthGuard]
      },
      {
        path: 'apartments',
        loadChildren: () => import('./apartment/apartment.module').then(m => m.ApartmentModule),
        data: { role: ['APARTMENT_READ'] },
        canActivate: [AuthGuard]
      },
      {
        path: 'units',
        loadChildren: () => import('./unit/unit.module').then(m => m.UnitModule),
        data: { role: ['UNIT_READ'] },
        canActivate: [AuthGuard]
      },
      {
        path: 'tenants',
        loadChildren: () => import('./tenant/tenant.module').then(m => m.TenantModule),
        data: { role: ['TENANT_READ'] },
        canActivate: [AuthGuard]
      },
      {
        path: 'occupations',
        loadChildren: () => import('./occupation/occupation.module').then(m => m.OccupationModule),
        data: { role: ['OCCUPATION_READ'] },
        canActivate: [AuthGuard]
      },
      {
        path: 'rent-advances',
        loadChildren: () => import('./rent-advance/rent-advance.module').then(m => m.RentAdvanceModule),
        data: { role: ['ADVANCE_READ'] },
        canActivate: [AuthGuard]
      },
      {
        path: 'notices',
        loadChildren: () => import('./notice/notice.module').then(m => m.NoticeModule),
        data: { role: ['NOTICE_READ'] },
        canActivate: [AuthGuard]
      },
      {
        path: 'payments',
        loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule),
        data: { role: ['PAYMENT_READ'] },
        canActivate: [AuthGuard]
      },
      {
        path: 'occupation-transactions',
        loadChildren: () => import('./occupation-transaction/occupation-transaction.module').then(m => m.OccupationTransactionModule),
        data: { role: ['OCCUPATION_TRANSACTION_READ'] },
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
