import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnDestroy {

  authUserData = {};

  constructor(private authService: AuthService, private router: Router) {}

  loginUser() {
    this.authService.loginUser(this.authUserData)
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

  registerUser() {
    this.authService.registerUser(this.authUserData)
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
