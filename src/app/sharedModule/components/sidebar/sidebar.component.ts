import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { BlogtypeService } from '../../../core/services/blogtype.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { StorageServiceService } from '../../../core/services/storage-service.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  userRole: string = '';
  title: string = 'Name here';
  categoryList: any = [];
  imageUrl: string = '';
  selectedCategory: number = 0;

  constructor(private blogTypeService: BlogtypeService
    , private authService: AuthService
    , private router: Router
    , @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.bindProfileSection();
  }


  bindProfileSection() {
    if (isPlatformBrowser(this.platformId)) {      
      let userData = JSON.parse(sessionStorage.getItem('userDetails')!);

      this.userRole = userData.roleName;
      this.title = userData.salutation + ' ' + userData.firstName + ' ' + userData.lastName;
      this.imageUrl = 'data:' + userData.imageExtension + ';base64,' + userData.image;
    }
  }

   logOut() {
    this.authService.logout().pipe().subscribe({
      next: (res) => {
        this.router.navigate(['/login']);
        window.sessionStorage.clear();
      },
      error: (err) => {
        const message = err.error?.message || 'Logout failed';
        alert(message);
      }
    });
  }
}
