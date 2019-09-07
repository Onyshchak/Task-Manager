import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from '../task.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss', '../tasks/toast.scss']
})

export class NewTaskComponent implements OnDestroy {

  constructor(public taskService: TaskService) {}

  onConfirm(form: NgForm): void {
    this.taskService.createTask(form.value.title, form.value.description).subscribe(
      res => {
        this.showToast('Task created');
        console.log(res)
      },
      err => console.log(err)
    );
    form.resetForm();
  }

  showToast(message: string): void {
    const toast = document.getElementById('snackbar');
    toast.innerHTML = message;
    toast.className = 'show';
    timer(3000).subscribe(() => toast.className = toast.className.replace('show', ''))
  }

  ngOnDestroy() {}
}
