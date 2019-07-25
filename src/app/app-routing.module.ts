import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ShareComponent } from './share/share.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';

const routes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'new-task', component: NewTaskComponent},
  {path: 'edit', component: EditTaskComponent},
  {path: 'share', component: ShareComponent},
  {path: 'tasks-list', component: TasksListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
