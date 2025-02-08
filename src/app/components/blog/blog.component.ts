import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { BlogType } from 'src/app/types/blogs.type';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  blog!: BlogType;
  blogId!: number;

  constructor(private readonly route: ActivatedRoute, private readonly blogService: BlogService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.blogId = params['id']!;
    })
    this.fetchBlog();
  }

  fetchBlog() {
    this.blogService.fetchBlogById(this.blogId).subscribe((data) => {
      this.blog = data.result;
    }, (error) => {
      console.error(error);
    })
  }
}
