import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TaskService } from '../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss', '../tasks/toast.scss']
})

export class NewTaskComponent implements OnDestroy {

  constructor(public taskService: TaskService) {}

  onConfirm(form: NgForm) {
    this.taskService.createTask(form.value.title, form.value.description).subscribe(
      res => {
        this.showToast('Task created');
        console.log(res)
      },
      err => console.log(err)
    );
    form.resetForm();
  }

  showToast(message) {
    const toast = document.getElementById("snackbar");
    toast.innerHTML = message;
    toast.className = "show";
    setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
  }

  ngOnDestroy() {}
}
