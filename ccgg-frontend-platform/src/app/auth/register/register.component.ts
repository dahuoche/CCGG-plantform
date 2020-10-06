import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  match: boolean;

  message: string;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.match = true;
  }

  register(user) {
    if (this.ValidateForm(user)) {
      this.authService.signup(user).subscribe((res) => {
        this.message = res.message;
        this.match = false;
      });
    }
  }

  InputChange() {
    this.message = "";
    this.match = true;
  }

  ValidateForm(user): boolean {
    if (user.name === "") {
      this.message = "username is empty";
      this.match = false;
      return false;
    }
    if (user.email === "") {
      this.message = "email is empty";
      this.match = false;
      return false;
    }
    if (user.password === "") {
      this.message = "password is empty";
      this.match = false;
      return false;
    }
    if (user.password !== user.cpassword) {
      this.message = "password is not match";
      this.match = false;
      return false;
    }
    return true;
  }
}
