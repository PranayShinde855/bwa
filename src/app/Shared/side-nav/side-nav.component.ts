import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { BlogtypeService } from '../../services/blogtype.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { StorageServiceService } from '../../services/storage-service.service';
@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
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
      debugger
      this.userRole = userData.roleName;
      this.title = userData.salutation + ' ' + userData.firstName + ' ' + userData.lastName;
      this.imageUrl = 'data:' + userData.imageExtension + ';base64,' + userData.image;
    }
  }

  logout1() {
    this.authService.logout().subscribe((res) => {
      window.alert(res.data.message);
      this.router.navigate(['/login']);
    });
  }

   logOut() {
    this.authService.logout().pipe().subscribe({
      next: (res) => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        const message = err.error?.message || 'Logout failed';
        alert(message);
      }
    });
  }
}
