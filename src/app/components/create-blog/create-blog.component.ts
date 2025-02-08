import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent {
  blogForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private blogService: BlogService) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      about: ['', Validators.required],
      brief: ['', Validators.required]
    });
  }

  createBlog() {
    if (this.blogForm.invalid) return; // Prevent API call if form is invalid

    this.blogService.createBlog(this.blogForm.value).subscribe(() => {
        this.message = 'Blog created successfully!';
        this.blogForm.reset();
      }, (err) => {
        console.error('Error creating blog:', err);
        this.message = 'Failed to create blog.';
      });
  }
}
