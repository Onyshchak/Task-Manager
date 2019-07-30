import { Component, OnDestroy, OnInit } from '@angular/core';

import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})

export class TasksListComponent implements OnInit, OnDestroy {

  constructor(public taskService: TaskService) {}

  tasks: Task[] = [];
  private tasksSub : Subscription;

  // ngOnInit() {
  //   this.tasks = this.taskService.getTasks();
  //   this.tasksSub = this.taskService.getTaskUpdatedListener()
  //     .subscribe((tasks: Task[]) => {
  //       this.tasks = tasks;
  //     });
  // }
  ngOnInit() {
    this.tasks = this.taskService.getTasks();
    this.tasksSub = this.taskService.getTaskUpdatedListener()
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
  }

  onDelete(taskId) {
    console.log(taskId);
  }

  ngOnDestroy() {
    this.tasksSub.unsubscribe();
  }


  // {
    //   title: 'Name 1',
    //   content: 'Some text'
    // },
    // {
    //   title: 'Name 2',
    //   content: 'Some text'
    // },
    // {
    //   title: 'Name 3',
    //   content: 'Some text'
    // },
    // {
    //   title: 'Name 4',
    //   content: 'Some text'
    // },
    // {
    //   title: 'Name 5',
    //   content: 'Some text'
    // }

}
