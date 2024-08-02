import { Component, inject } from '@angular/core';
import { GenericDataSource } from '@/utils/GenericDataSource';
import { UserService } from '@/services/user.service';
import { User } from '@/models/user.model';
import { NgClass } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports:[NgClass, CdkTableModule],
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent  {

  dataSource = new GenericDataSource<User>();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  userService = inject(UserService);
  constructor() {}

  ngOnInit(){
    this.userService.getAll().subscribe({
      next: (data) => this.dataSource.init(data)
    })
  }

}
