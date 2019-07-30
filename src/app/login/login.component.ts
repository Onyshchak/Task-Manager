import { Component } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  constructor(private taskService: TaskService) {}

  newUser: boolean = true;
  email = '';
  passwordCheck = '';
  password = '';

  confirm() {
    const user = {
      email: this.email,
      passwordCheck: this.passwordCheck,
      password: this.password
    };


    console.log(user);
    // try {
    //   if (false) {
    //     throw Error;
    //   }
    //   console.log(this.userData);
    //   this.taskService.addTask(this.userData).subscribe();
    // } catch (e) {
    //
    // }
  }
}
