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

  newShare(taskId: string, email: string) {
    return this.http.patch<Task>(`${this.taskShare}/new/${taskId}`, {access: email})
  }

  removeShare(taskId: string, email: string) {
    return this.http.patch<string>(`${this.taskShare}/remove/${taskId}`, {access: email})
  }

  editTask(taskId: string, title: string, description: string): Observable<Task> {
    return this.http.patch<Task>(`${this.tasksUrl}/${taskId}`, {title: title, description: description})
  }

  createTask(title: string, description: string): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, {title: title, description: description})
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.tasksUrl}/${taskId}`)
  }
}
