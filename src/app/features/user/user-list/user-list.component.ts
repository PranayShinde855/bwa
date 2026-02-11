import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { merge } from 'rxjs';
import { listRequest } from '../../../sharedModule/models/listRequest';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from "@angular/router";
import { UserListModel } from '../../../sharedModule/models/UserModels/userListModel';
import { UserService } from '../../../core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { deleteUserRequest } from '../../../sharedModule/models/UserModels/deleteUserRequest';
import { GetRoles } from '../../../sharedModule/models/UserModels/GetRoles';
import { ActivateDeactivateUserComponent } from '..//activate-deactivate-user-component/activate-deactivate-user-component';
import { CheckPermissionsService } from '../../../core/services/check-permissions.service';


@Component({
  selector: 'app-user-cretae',
  standalone: true, // FIX 1: Add standalone flag
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule, // FIX 2: Use the Module
    MatSortModule, // FIX 2: Use the Module
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  roles: GetRoles[] = [];
  searchText = "";
  displayedColumns: string[] = ["srNo", "name", "role", "createdDate", "isActive", "actions"];
  dataSource = new MatTableDataSource<UserListModel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService
    , private router: Router
    , private matDialog: MatDialog
    , private checkPermissionsService: CheckPermissionsService
  ) {
    this.getData();
    this.checkPermissionsService.checkUserModulePermission();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //this.getData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchText = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getData();
  }

  getPginatatedData() {
    let request: listRequest = {
      globalSearch: this.searchText,
      pageIndex: this.paginator?.pageIndex + 1 || 1,
      pageSize: this.paginator?.pageSize || 10,
      ordeByColumn: '',
      orderBy: ''
    };

    this.userService.getAll(request).subscribe({
      next: (res) => {
        this.dataSource.data = res.data.list as UserListModel[];
        if (this.paginator) {
          this.paginator.length = res.data.totalCount;
        }
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  getData() {
    let request: listRequest = {
      globalSearch: this.searchText,
      pageIndex: this.paginator?.pageIndex + 1 || 1,
      pageSize: this.paginator?.pageSize || 10,
      ordeByColumn: '',
      orderBy: ''
    };

    this.userService.getAll(request).subscribe({
      next: (res) => {
        this.dataSource.data = res.data.list as UserListModel[];
        if (this.paginator) {
          this.paginator.length = res.data.totalCount;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getById(blogId: number) {
    this.router.navigate(['/users/edit', blogId]);
  }

  showDiaglog(id: number) {
    if (id <= 0)
      window.alert("Kindly select the user.");

    let dialogRef = this.matDialog.open(DeleteUserComponent,
      {
        'width': '50%',
        data: ({ userId: id })
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result.isConfirmed) {
        let userDeleteRequest: deleteUserRequest = {
          id: id
        };

        this.userService.delete(userDeleteRequest).subscribe({
          next: (res) => {
            window.alert(res.message);
            this.getData();
          },
          error: (error) => {
            window.alert(error.error);
          }
        });
      }
    });
  }

  deactivateActivateUser(id: number) {
    if (id <= 0)
      window.alert("Kindly select the user.");

    let dialogRef = this.matDialog.open(ActivateDeactivateUserComponent,
      {
        'width': '50%',
        data: ({ dataString: 'deactivate' })
      }
    )

    dialogRef.afterClosed().subscribe((result) => {
      if (result.isDeactivate) {
        let userDeactivateRequest: any = {
          userId: id
        };

        this.userService.deactivateUser(userDeactivateRequest).subscribe({
          next: (res) => {
            window.alert(res.message);
            this.getData();
          },
          error: (error) => {
            window.alert(error.error);
          }
        });
      }
    });
  }

  activateActivateUser(id: number) {
    if (id <= 0)
      window.alert("Kindly select the user.");

    let dialogRef = this.matDialog.open(ActivateDeactivateUserComponent,
      {
        'width': '50%',
        data: ({ dataString: 'activate' })
      }
    )

    dialogRef.afterClosed().subscribe((result) => {
      if (result.isActivate) {
        let userActivateRequest: any = {
          userId: id
        };

        this.userService.deactivateUser(userActivateRequest).subscribe({
          next: (res) => {
            window.alert(res.message);
            this.getData();
          },
          error: (error) => {
            window.alert(error.error);
          }
        });
      }
    });
  }
}