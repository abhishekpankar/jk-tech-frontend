import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent {
  blogForm: FormGroup;
  message: string = '';
  blogId?: number;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private fb: FormBuilder, private blogService: BlogService
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      about: ['', Validators.required],
      brief: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.blogId = params['id']!;
    })
    if (this.blogId) {
      this.blogService.fetchBlogById(this.blogId).subscribe((data) => {
        const blog = data.result;
        this.blogForm = this.fb.group({
          title: [blog.title, Validators.required],
          about: [blog.about, Validators.required],
          brief: [blog.brief, Validators.required]
        });
      })
    }
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

  updateBlog() {
    if (this.blogForm.invalid) return; // Prevent API call if form is invalid

    this.blogService.updateBlog(this.blogId!, this.blogForm.value).subscribe(() => {
        this.message = 'Blog updated successfully!';
        this.router.navigateByUrl(`/blogs/${this.blogId}`);
      }, (err) => {
        console.error('Error updating blog:', err);
        this.message = 'Failed to update blog.';
      });
  }
}
