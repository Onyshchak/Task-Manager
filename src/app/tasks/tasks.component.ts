import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { AuthService } from '../auth.service';
import { TaskService } from '../task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { timer } from 'rxjs';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss', './toast.scss']
})

export class TasksComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService,
              private taskService: TaskService,
              private router: Router) {}

  tasks: Task[] = [];
  modalTask: Task = {} as Task;

  ngOnInit() {
    this.tasksSubscribe()
  }

  tasksSubscribe(): void {
    this.taskService.getTasks()
      .subscribe(
        tasks => {
          this.tasks = tasks
        },
        err => {
          this.showToast(err.error);
          if (err instanceof HttpErrorResponse && err.status === 401) {
            console.log(err);
            this.router.navigate(['/auth'])
          }
        }
      )
  }

  setCurrentTask(task: Task): void {
    this.modalTask = task
  }

  newShare(task: Task, email: NgForm): void {
    const newEmail: string = email.value;
    this.taskService.newShare(task._id, newEmail).subscribe(
      res => {
        this.showToast('Shared');
        console.log(res)
      },
      err => {
        this.showToast(err.error);
        console.log(err)
      },
      () => task.share.push(newEmail)
    );
    email.reset()
  }

  removeShare(task: Task, email: NgForm): void {
    const removedEmail: string = email.value;
    this.taskService.removeShare(task._id, removedEmail).subscribe(
      res => {
        this.showToast('Share removed');
        console.log(res)
      },
      err => {
        this.showToast(err.error);
        console.log(err)
      },
      () => {
        const delIndex = task.share.indexOf(removedEmail);
        if(delIndex > -1) task.share.splice(delIndex, 1);
      }
    );
    email.reset()
  }

  editTask(task: Task, title: NgForm, description: NgForm): void {
    const editedTask = {
      title: title.value,
      description: description.value
    };

    this.taskService.editTask(task._id, editedTask.title, editedTask.description).subscribe(
      res => {
        this.showToast('Changes saved');
        console.log(res)
      },
      err => {
        this.showToast(err.error);
        console.log(err);
      },
      () => {
        task.title = editedTask.title;
        task.description = editedTask.description;
      }
    );
    title.reset();
    description.reset();
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task._id).subscribe(
      res => {
        this.showToast('Deleted');
        console.log(res)
      },
      err => {
        this.showToast(err.error);
        console.log(err);
      },
      () => {
        const delIndex = this.tasks.indexOf(task);
        if(delIndex > -1) this.tasks.splice(delIndex, 1);
      }
    );
  }

  showToast(err: string): void {
    const toast = document.getElementById('snackbar');
    toast.innerHTML = err;
    toast.className = 'show';
    timer(3000).subscribe(() => toast.className = toast.className.replace('show', ''))
  }

  ngOnDestroy() {}
}
