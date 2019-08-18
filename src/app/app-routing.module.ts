import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksComponent } from './tasks/tasks.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: '', component: TasksComponent},
  {path: 'create-task', component: NewTaskComponent},
  {path: 'tasks', component: TasksComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
