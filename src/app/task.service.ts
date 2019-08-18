import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task.model';

@Injectable()

export class TaskService {

  constructor(private http: HttpClient) {}

  private tasksUrl = 'http://localhost:3000/api/tasks';
  private taskShare = 'http://localhost:3000/api/share';

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl)
  }

  newShare(taskId, email) {
    return this.http.patch<Task>(`${this.taskShare}/new/${taskId}`, {access: email})
  }

  removeShare(taskId, email) {
    return this.http.patch<string>(`${this.taskShare}/remove/${taskId}`, {access: email})
  }

  editTask(taskId, title, description): Observable<Task> {
    return this.http.patch<Task>(`${this.tasksUrl}/${taskId}`, {title: title, description: description})
  }

  createTask(title, description) {
    return this.http.post<Task>(this.tasksUrl, {title: title, description: description})
  }

  deleteTask(taskId): Observable<void> {
    return this.http.delete<void>(`${this.tasksUrl}/${taskId}`)
  }
}
