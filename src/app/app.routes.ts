import { Routes } from '@angular/router';
import { LoginComponent } from './domains/login/pages/login/login.component';
import { BoardsComponent } from '@/dashboard/pages/boards/boards.component';
import { BoardComponent } from '@/dashboard/pages/board/board.component';

export const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'boards',
    component: BoardsComponent
  },
  {
    path:'board',
    component: BoardComponent
  }
];
