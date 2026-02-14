import { AfterViewInit, Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { merge, tap } from 'rxjs';
import { BlogService } from '../../../core/services/blog.service';
import { BlogListModel } from '../../../sharedModule/models/BlogMoels/blogListModel';
import { listRequest } from '../../../sharedModule/models/listRequest';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from "@angular/router";
import { BlogDeleteComponent } from "../delete-blog/delete-blog.component";
import { MatDialog } from "@angular/material/dialog";
import { BlogDeleteRequest } from '../../../sharedModule/models/BlogMoels/BlogDeleteRequest';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    RouterLink,
    BlogDeleteComponent
  ],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit, AfterViewInit {
  showTable: boolean = true;
  isPopupVisible: boolean = false;
  searchText = "";
  displayedColumns: string[] = ["srNo", "title", "category", "createdDate", "actions"];
  dataSource = new MatTableDataSource<BlogListModel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private blogService: BlogService
    , private router: Router
    , public dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.getData();
  }
  ngAfterViewInit(): void {
    debugger
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    merge(this.paginator.page, this.sort.sortChange).pipe(
      tap(() => this.getData())
    ).subscribe();
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

    console.log(this.searchText);
    let request: listRequest = {
      globalSearch: this.searchText,
      pageIndex: this.paginator?.pageIndex + 1 || 1,
      pageSize: this.paginator?.pageSize,
      ordeByColumn: '',
      orderBy: ''
    };

    this.blogService.get(request).subscribe({
      next: (res) => {
        // if(res.data.list.length < 0)
        //   this.hidetable();

        this.dataSource.data = res.data.list as BlogListModel[];
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
      pageSize: this.paginator?.pageSize,
      ordeByColumn: '',
      orderBy: ''
    };

    this.blogService.get(request).subscribe({
      next: (res) => {
        this.dataSource.data = res.data.list as BlogListModel[];
        // if (this.paginator) {
        this.paginator.length = res.data.totalCount;
        // }        
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getById(blogId: number) {
    this.router.navigate(['/blogs/edit', blogId]);
  }

  showpopup(id: number) {
    const dialogRef = this.dialog.open(BlogDeleteComponent,
      {
        width: '50%',
        data: { blogId: id }
      }
    );

    dialogRef.afterClosed().subscribe(result => {


      if (result.isConfirmed) {
        let deleteRequest: BlogDeleteRequest = {
          id: result.blogId
        };
        this.blogService.delete(deleteRequest).subscribe({
          next: (res) => {
            window.alert(res.message);
            this.getData();
            window.location.reload();
          },
          error: (error) => {
            window.alert(error.error);
          }
        });
      }
    });
  }

  hidepopup() {
    this.isPopupVisible = false;
  }

  hidetable() {
    this.showTable = false;
  }
}