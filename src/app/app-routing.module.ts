import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TaskActionsComponent } from './task-actions/task-actions.component';
import { ShareComponent } from './share/share.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'task-actions', component: TaskActionsComponent},
  {path: 'share', component: ShareComponent},
  {path: 'tasks-list', component: TasksListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
