import { Routes } from '@angular/router';
import { LoginComponent } from './domains/login/pages/login/login.component';
import { BoardsComponent } from '@/dashboard/pages/boards/boards.component';
import { BoardComponent } from '@/dashboard/pages/board/board.component';
import { ScrollComponent } from '@/dashboard/pages/scroll/scroll.component';
import { TableComponent } from '@/dashboard/pages/table/table.component';

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
  },
  {
    path:'scroll',
    component: ScrollComponent
  },
  {
    path:'table',
    component: TableComponent
  }
];
