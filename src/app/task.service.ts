import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from './task.model';

@Injectable({providedIn: 'root'})

export class TaskService {

  constructor(private http: HttpClient) {}

  private tasks: Task[] = [];
  private tasksUpdated = new Subject<Task[]>();

  getTasks() {
    return [...this.tasks];
  }

  getTaskUpdatedListener() {
    // return this.tasksUpdated.asObservable();
    return this.http.get('http://localhost:3000/tasks');
  }

  // addTask(title: string, description: string) {
  //   const task: Task = {
  //     title: title,
  //     description: description
  //   };
  //
  //  this.tasks.push(task);
  //  this.tasksUpdated.next([...this.tasks]);
  //
  //   // return this.http.post('http://localhost:3000/results', task);
  // }

  addTask(title: string, description: string) {
    const task: Task = {
      title: title,
      description: description
    };

    return this.http.post('http://localhost:3000/tasks', task);
  }

  editTask(task) {
    return this.http.put(`http://localhost:3000/results/${task.id}`, task);
  }

  deleteTask(task: Task) {
    // return this.http.delete(`http://localhost:3000/results/${task.id}`, task);
  }
}
