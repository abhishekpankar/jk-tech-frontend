import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../types/response.type';
import { Blog, CreateBlogType } from '../types/blogs.type';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  jwtHelper = new JwtHelperService();

  constructor(private readonly http: HttpClient) {}

  fetchBlogs(page: number) {
    return this.http.get<ApiResponse<Pick<Blog, 'title' | 'about' | 'createdAt' | 'id'>[]>>(`/api/v1/blogs`, {
      params: {
        page,
      }
    });
  }

  fetchBlogById(id: number) {
    return this.http.get<ApiResponse<Blog>>(`/api/v1/blogs/${id}`);
  }

  createBlog(payload: CreateBlogType) {
    return this.http.post<ApiResponse>(`/api/v1/blogs`, payload);
  }
}
