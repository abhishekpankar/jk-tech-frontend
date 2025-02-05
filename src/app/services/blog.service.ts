import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../types/response.type';
import { Blog } from '../types/blogs.type';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private readonly http: HttpClient) { }

  fetchBlogs(page: number) {
    return this.http.get<ApiResponse<Blog[]>>(`/api/v1/blogs`, {
      params: {
        page,
      }
    });
  }
}
