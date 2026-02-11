import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';
import { ViewBlogComponent } from './view-blog/view-blog.component';

const routes: Routes = [
  {
    path:'',
    component:BlogsComponent
  },
  {
    path:'view/id',
    component:ViewBlogComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PublicModule {
  constructor(){
    
  }
 }
