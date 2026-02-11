import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../core/services/blog.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-blog',
  imports: [DatePipe],
  templateUrl: './viewblog.component.html',
  styleUrl: './viewblog.component.scss'
})
export class ViewblogComponent {
  
  title: string = '';
  description: string = '';
  image: string = '';
  category: string = '';
  createdDate: string = '';
  constructor(private blogService: BlogService
    , private activatedRoute: ActivatedRoute
  ) {
    // Use any way to convert into number.
    // const id = +this.activatedRoute.snapshot.paramMap.get('id')!;
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id)
      this.getblog(id);
  }


  getblog(id: number) {
    let request = {
      id: id
    };
    this.blogService.getUserBlogById(request).subscribe((res) => {
      this.title = res.data.title;
      this.description = res.data.content;
      this.title = res.data.title;
      this.category = res.data.category;
      this.createdDate = res.data.createdDate;

      if (res.data.image != null && res.data.image.length > 0) {
        this.image = `data:${res.data.imageExtension};base64,${res.data.image}`;
        ;
      }
    });
  }
}
