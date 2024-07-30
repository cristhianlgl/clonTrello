import { Routes } from '@angular/router';
import { LoginComponent } from './domains/login/pages/login/login.component';
import { BoardsComponent } from '@/dashboard/pages/boards/boards.component';
import { BoardComponent } from '@/dashboard/pages/board/board.component';
import { ScrollComponent } from '@/dashboard/pages/scroll/scroll.component';
import { TableComponent } from '@/dashboard/pages/table/table.component';
import { LayoutComponent } from '@/layout/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'app',
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
      }
    ]
  }
];
