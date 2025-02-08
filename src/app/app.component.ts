import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentRoute = '/';
  currentRole?: string;;

  constructor(private readonly router: Router, private readonly authService: AuthService) {}

  ngOnInit() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.currentRoute = e.url;
        this.currentRole = this.authService.getRole();
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
