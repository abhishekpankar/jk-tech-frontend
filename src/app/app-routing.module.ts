import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { BlogComponent } from './components/blog/blog.component';
import { CreateBlogComponent } from './components/create-blog/create-blog.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'blogs/create', component: CreateBlogComponent, canActivate: [AuthGuard] },
  { path: 'blogs/update/:id', component: CreateBlogComponent, canActivate: [AuthGuard] },
  { path: 'blogs/:id', component: BlogComponent },
  // { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
