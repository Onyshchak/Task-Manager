import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss', '../tasks/toast.scss']
})

export class AuthComponent implements OnDestroy {

  user: User = {
    email: '',
    password: '',
    name: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  loginUser() {
    this.authService.loginUser({email: this.user.email, password: this.user.password})
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

  registerUser(registerData: NgForm) {
    if(this.user.password !== registerData.value.password) {
      this.showToast("Passwords are different");
      registerData.reset();
      return;
    }
    this.user.name = registerData.value.name;
    this.authService.registerUser(this.user)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/tasks']);
        },
        err => {
          this.showToast(err.error);
          console.log(err);
          registerData.reset()
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
