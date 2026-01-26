import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
//import { MenuComponent } from './Shared/menu/menu.component';
import { isPlatformBrowser } from '@angular/common';
import { SideNavComponent } from "./Shared/side-nav/side-nav.component";
import { ToasterComponent } from "./Shared/toaster/toaster.component";
import { FooterComponent } from "./Shared/footer/footer.component";
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SideNavComponent,
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
  debugger
    this.isLoggedIn$ = this.authService.loggedIn$;
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      let token = window.localStorage.getItem('token');
      if (token != undefined && token?.length > 0)
        this.authService.setLoggedInStatus(true);
      else
        this.authService.setLoggedInStatus(true);
    }
    else
      this.authService.setLoggedInStatus(true);
  }
}