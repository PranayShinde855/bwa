import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { listRequest } from '../../../models/listRequest';
import { DashboardBlogList } from '../../../models/BlogMoels/DashbardBlogList';
import { DashboardService } from '../../../services/dashboard.service';
import { TruncatePipe } from "../../../services/pipe/truncate";
import { BlogtypeService } from '../../../services/blogtype.service';
import { NgFor } from '@angular/common';
import { getBlogsRequest } from '../../../models/BlogMoels/getBlogsRequest';
import { Router } from '@angular/router';
import { debug } from 'console';
import { CheckPermissionsService } from '../../../services/check-permissions.service';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  selectedCategory: number = 1;
  blogTypes: any= [];
  blogs: DashboardBlogList[] = [];
  constructor(private dashboardService: DashboardService
    , private blogTypeService: BlogtypeService
    , private router: Router
  , private checkPermissionsService: CheckPermissionsService) {
    this.checkPermissionsService.checkEDitorAndUserDashboardPermission();
    this.getBlogs();
    this.getCategory();
    //this.getBlogsById()
  }

  getBlogs() {

    let request = {
      categoryId: this.selectedCategory
    };

    // this.blogService.get(request).subscribe({
    this.dashboardService.GetUserBlogByCategoryIdAsync(request).subscribe((res) => {
      this.blogs = res.data as DashboardBlogList[];
    });
  }

  getCategory(){
    debugger
    this.blogTypeService.getAsync().subscribe((res)=>{
      this.blogTypes = res.data
    })
  }

   getBlogsById() {

    let request = {
      categoryId: this.selectedCategory
    };

    // this.blogService.get(request).subscribe({
    this.dashboardService.GetUserBlogByCategoryIdAsync(request).subscribe((res) => {
      this.blogs = res.data as DashboardBlogList[];
    });
  }

  readMore(id: number){
    debugger
    this.router.navigate(['/dashboard/viewBlog', id]); 
  }
}
