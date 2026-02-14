import { Component } from '@angular/core';
import { formatDate, DatePipe, NgFor } from '@angular/common';
import { BlogService } from '../../../core/services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardBlogList } from '../../../sharedModule/models/BlogMoels/DashbardBlogList';
import { DashboardService } from '../../../core/services/dashboard.service';
import { BlogtypeService } from '../../../core/services/blogtype.service';
import { CheckPermissionsService } from '../../../core/services/check-permissions.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blogs',
  imports: [FormsModule, NgFor],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})

export class BlogsComponent {
  selectedCategory: number = 1;
  blogTypes: any= [];
  blogs: DashboardBlogList[] = [];
  constructor(private dashboardService: DashboardService
    , private blogTypeService: BlogtypeService
    , private router: Router) {    
    this.getBlogs();
    this.getCategory();
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
    
    this.router.navigate(['/dashboard/viewBlog', id]); 
  }
}

