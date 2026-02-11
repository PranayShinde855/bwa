import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
//import { MenuComponent } from './Shared/menu/menu.component';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../app/core/services/auth.service';
import { SidebarComponent } from './sharedModule/components/sidebar/sidebar.component';
import { FooterComponent } from './sharedModule/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    FooterComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn$: any;
  title = 'BWA';
  constructor(private authService: AuthService
    , @Inject(PLATFORM_ID) private platformId: Object) {
    this.isLoggedIn$ = this.authService.loggedIn$;
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      let token = window.sessionStorage.getItem('token');

      if (token != undefined && token?.length > 0)
        this.authService.setLoggedInStatus(true);
      else
        this.authService.setLoggedInStatus(false);
    }
    else
      this.authService.setLoggedInStatus(true);
  }
}