import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  localUser;
  batch = '';
  focus = '';
  trainer = '';

  constructor(public authService: AuthService, public userService: UserService) { }

  ngOnInit() {
    this.authService.getUser().subscribe(res => {
      this.localUser = res;
      if (this.localUser['batch'] !== undefined) {
        this.batch = this.localUser['batch']['batch'];
        this.focus = this.localUser['batch']['focus'];
        this.trainer = this.localUser['batch']['trainer'];
      }
    });
  }

}
