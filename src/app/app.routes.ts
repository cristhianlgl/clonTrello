import { Routes } from '@angular/router';
import { BoardsComponent } from '@/dashboard/pages/boards/boards.component';
import { BoardComponent } from '@/dashboard/pages/board/board.component';
import { ScrollComponent } from '@/dashboard/pages/scroll/scroll.component';
import { TableComponent } from '@/dashboard/pages/table/table.component';
import { LayoutComponent } from '@/layout/layout/layout.component';
import { LoginComponent } from '@/auth/pages/login/login.component';
import { ForgotPasswordComponent } from '@/auth/pages/forgot-password/forgot-password.component';
import { RegisterComponent } from '@/auth/pages/register/register.component';
import { RecoveryComponent } from '@/auth/pages/recovery/recovery.component';
import { authGuard, redirectGuard } from '@/guards/auth.guard';
import { UsersTableComponent } from '@/users/pages/users-table/users-table.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [redirectGuard],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        title: 'Forgot Password'
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register'
      },
      {
        path: 'recovery',
        component: RecoveryComponent,
        title: 'Recovery'
      }
    ]
  },
  {
    path: 'app',
    canActivate: [authGuard],
    component: LayoutComponent,
    children:[
      {
        path: '',
        redirectTo: 'boards',
        pathMatch: 'full'
      },
      {
        path: 'boards',
        component: BoardsComponent
      },
      {
        path: 'board',
        component: BoardComponent
      },
      {
        path: 'table',
        component: TableComponent
      },
      {
        path: 'scroll',
        component: ScrollComponent
      },
      {
        path: 'users',
        component: UsersTableComponent
      }
    ]
  }
];
