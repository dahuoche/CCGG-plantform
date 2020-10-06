import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  response;

  AuthMessage: string;

  AuthMessageStatus: boolean;

  constructor(public authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.AuthMessageStatus = false;
  }

  login(user) {
    this.authService.login(user)
      .subscribe((res) => {
        this.response = res;
        if (res.success) {
        } else {
          this.AuthMessageStatus = true;
          this.AuthMessage = "Invalid email or password.";
        }
      });
  }

  InputChange() {
    this.AuthMessage = "";
    this.AuthMessageStatus = false;
  }
}
