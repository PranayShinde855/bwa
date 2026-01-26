import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { authGuard } from "../../guards/auth.guard";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { BlogPageComponent } from "./blog-page/blog-page.component";


export const dashboardRoutes: Routes = [
    {
        path: '',
        component: AdminDashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'editor',
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'user',
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'viewBlog/:id',
        component: BlogPageComponent
    }
]