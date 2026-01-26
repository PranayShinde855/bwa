import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { SharedMaterialModule } from '../../../modules/shared-material/shared-material.module';
import { DashboardCountSection } from '../../../models/UserModels/DashboardUsersList';
import { DashboardPostPerformanceData } from '../../../models/DashboardPostPerformanceData';
import { DashboardService } from '../../../services/dashboard.service';
import Chart from 'chart.js/auto';   
import { DashboardBlogList } from '../../../models/BlogMoels/DashbardBlogList';
//import { RouterLink } from '@angular/router';
import { error } from 'node:console';
import { isPlatformBrowser } from '@angular/common';
import { BlogtypeService } from '../../../services/blogtype.service';
import { BlogType } from '../../../models/BlogMoels/BlogType';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { CheckPermissionsService } from '../../../services/check-permissions.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [SharedMaterialModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  public chart: any;
  blogs: DashboardBlogList[] = [];
  blogTypes: BlogType[] = [];
  selectedCategory: number = 1;
  dashboardPostPerformanceData: DashboardPostPerformanceData = {
    data: [],
    DataFor: '',
    id: 0
  };
  dashboardDataCounts: DashboardCountSection = {
    blogsCount: 0,
    typesCount: 0,
    usersCount: 0
  };

  constructor(private dashboardService: DashboardService
    , private blogTypeService: BlogtypeService
    , private router: Router
    , @Inject(PLATFORM_ID) private platformId: Object
    , private checkPermissionsService: CheckPermissionsService
  ) {
    this.checkPermissionsService.checkAdminDashboardPermission();
  }
  ngOnInit(): void {
    this.getBlogs();
    this.getCount();
    this.getCategory();
    this.getPostPerformanceData();
    this.getCategoryPostPerformanceData(this.selectedCategory);
    //this.createChart();
  }

  getCategory() {
    this.blogTypeService.getAsync().subscribe((res) => {
      this.blogTypes = res.data as BlogType[]
    });
  }


  getBlogs() {
    this.dashboardService.getBlogs().subscribe((res) => {
      this.blogs = res.data as DashboardBlogList[];
    });
  }

  getCount() {
    this.dashboardService.getCounts().subscribe({
      next: (res) => {
        this.dashboardDataCounts = {
          blogsCount: res.data.blogsCount,
          typesCount: res.data.typesCount,
          usersCount: res.data.usersCount
        }
      },
      error: (err) => {
        if (isPlatformBrowser(this.platformId)) {
          window.alert(err.error);
        }
      }
    });
  }

  getPostPerformanceData() {
    const request = {
      year: new Date()
    };

    this.dashboardService.getPostPerformanceData(request).subscribe((res) => {
      this.dashboardPostPerformanceData = res.data as DashboardPostPerformanceData;

      // Create chart only after data is received
      this.createChart();
    });
  }

  getCategoryPostPerformanceData(id: number): void {
    const request = {
      year: new Date(),
      id: id
    };

    this.dashboardService.getGraphCategoryPerformance(request).subscribe((res) => {
      this.dashboardPostPerformanceData = res.data as DashboardPostPerformanceData;

      this.createCategoryChart();
    });
  }

  createChart() {
    if (!this.dashboardPostPerformanceData?.data) return;

    // Extract labels and values from your API response
    const labels = this.dashboardPostPerformanceData.data.map(d => d.data);
    const values = this.dashboardPostPerformanceData.data.map(item => +item.value);

    this.chart = new Chart("performanceChart", {
      type: 'line',
      data: {
        labels: labels, // Dynamically set labels
        datasets: [{
          label: "Sales",
          data: values, // Dynamically set values
          backgroundColor: 'Blue'
        }]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  createCategoryChart() {
    if (!this.dashboardPostPerformanceData?.data) return;

    const labels = this.dashboardPostPerformanceData.data.map(d => d.data);
    const values = this.dashboardPostPerformanceData.data.map(item => +item.value);

    this.chart = new Chart("categoryChart", {
      type: 'line',
      data: {
        labels: labels, // Dynamically set labels
        datasets: [{
          label: "Sales",
          data: values, // Dynamically set values
          backgroundColor: 'Green'
        }]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  viewBlog(id: number) {
    this.router.navigate(['/dashboard/viewBlog', id]);
  }
}
