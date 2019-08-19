import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnDestroy {

  loginData = {};

  constructor(private authService: AuthService, private router: Router) {}

  loginUser(loginData: NgForm) {
    this.authService.loginUser(loginData.value)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/tasks']);
        },
        err => {
          this.showToast(err.error);
          console.log(err);
        }
      )
  }

  setLoginData(loginData: NgForm) {
    this.loginData = loginData.value;
  }

  registerUser(registerData: NgForm) {
    if(this.loginData.password !== registerData.value.password) {
      this.showToast("Passwords are different");
      registerData.reset()
      return;
    }
    this.loginData.name = registerData.value.name;
    this.authService.registerUser(this.loginData)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/tasks']);
        },
        err => {
          this.showToast(err.error);
          console.log(err);
        }
      )
  }

  showToast(err) {
    const toast = document.getElementById("snackbar");
    toast.innerHTML = err;
    toast.className = "show";
    setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
  }

  ngOnDestroy() {}
}
