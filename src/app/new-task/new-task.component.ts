import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TaskService } from '../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})

export class NewTaskComponent implements OnDestroy {

  constructor(public taskService: TaskService) {}

  onConfirm(form: NgForm) {
    this.taskService.createTask(form.value.title, form.value.description).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
    form.resetForm();
  }

  ngOnDestroy() {}
}
