import { Component, inject } from '@angular/core';
import { GenericDataSource } from '@/utils/GenericDataSource';
import { UserService } from '@/services/user.service';
import { User } from '@/models/user.model';
import { AsyncPipe, NgClass } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { AuthService } from '@/services/auth.service';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports:[NgClass, CdkTableModule, AsyncPipe],
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent  {

  dataSource = new GenericDataSource<User>();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  userService = inject(UserService);
  authService = inject(AuthService);
  user$ = this.authService.user$;

  constructor() {}

  ngOnInit(){
    this.userService.getAll().subscribe({
      next: (data) => this.dataSource.init(data)
    });
  }

}
