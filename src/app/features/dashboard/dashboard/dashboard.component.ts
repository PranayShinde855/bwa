import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { SharedMaterialModule } from '../../../sharedModule/modules/shared-material/shared-material.module';
import Chart from 'chart.js/auto';
//import { RouterLink } from '@angular/router';
import { error } from 'node:console';
import { isPlatformBrowser, NgFor } from '@angular/common';
import { BlogtypeService } from '../../../core/services/blogtype.service';
import { DashboardService } from '../../../core/services/dashboard.service';
import { CheckPermissionsService } from '../../../core/services/check-permissions.service';
import { Router } from '@angular/router';
import { DashboardPostPerformanceData } from '../../../sharedModule/models/DashboardPostPerformanceData';
import { DashboardCountSection } from '../../../sharedModule/models/UserModels/DashboardUsersList';
import { BlogType } from '../../../sharedModule/models/BlogMoels/BlogType';
import { DashboardBlogList } from '../../../sharedModule/models/BlogMoels/DashbardBlogList';
import { FormsModule } from '@angular/forms';
import { TruncatePipe } from '../../../sharedModule/pipes/truncate';


@Component({
  selector: 'app-dashboard',
  imports: [SharedMaterialModule, FormsModule, NgFor, TruncatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  role: string = 'Admin';
  public chart: any;
  public categoryChart: any;
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
    this.checkPermissionsService.checkEDitorAndUserDashboardPermission();
    this.getBlogs();
    this.getCategory();
  }
  ngOnInit(): void {
    this.getRole();

    this.getBlogs();
    this.getCount();
    this.getCategory();

    if (this.role == 'Admin') {
      this.getPostPerformanceData();
      this.getCategoryPostPerformanceData(this.selectedCategory);
    }

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

    if (this.categoryChart) { this.categoryChart.destroy(); }

debugger
    const labels = this.dashboardPostPerformanceData.data.map(d => d.data);
    const values = this.dashboardPostPerformanceData.data.map(item => +item.value);

    this.categoryChart = new Chart("categoryChart", {
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

  readMore(id: number) {
    
    this.router.navigate(['/blogs/view', id]);
  }

  getRole() {
    const userDetails = typeof window !== 'undefined' ? sessionStorage.getItem('userDetails') : null;
    if (userDetails != null) {

      let details = JSON.parse(userDetails);
      this.role = details.roleName;
    }
    else {
      alert("Undefined User");
    }

  }
}
