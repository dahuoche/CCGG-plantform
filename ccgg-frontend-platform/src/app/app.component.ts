import { Component } from '@angular/core';
import {AuthService} from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ccgg-frontend-node';

  collapsed = true;

  constructor(
    public authService: AuthService
  ) {}

  Logout() {
    this.authService.logout();
  }
}
