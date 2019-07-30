import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TaskService } from '../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task-actions.component.html',
  styleUrls: ['./task-actions.component.scss']
})

export class TaskActionsComponent {

  constructor(public taskService: TaskService) {

  }

  newTask: boolean = true;
  title = '';
  description = '';

  onConfirm(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.taskService.addTask(form.value.title, form.value.description).subscribe();
    form.resetForm();
  }
}
