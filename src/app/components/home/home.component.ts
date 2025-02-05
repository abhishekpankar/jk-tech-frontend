import { Component } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { Blog } from 'src/app/types/blogs.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  blogs: Blog[] = [];
  page = 1;

  constructor(private readonly blogService: BlogService) {}

  ngOnInit() {
    this.fetchBlogs()
  }

  fetchBlogs() {
    this.blogService.fetchBlogs(this.page).subscribe((data) => {
      this.blogs = data.result;
    }, (error) => {
      console.error('Error fetching blogs', error)
    })
  }
}
