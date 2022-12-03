import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';

import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { UserTasksComponent } from './pages/user-tasks/user-tasks.component';
import { UserTaskComponent } from './pages/user-task/user-task.component';
import { UserTaskEditComponent } from './pages/user-task/edit/user-task-edit.component';
import { UserEditComponent } from './pages/users/edit/user-edit.component';
import { UserCreateComponent } from './pages/users/create/user-create.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    redirectTo: 'users'
  },
  {
    path: 'users',
    component: UsersComponent,
    // canActivate: [AuthGuard],
    // data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'user/create',
    component: UserCreateComponent,
  },
  {
    path: 'user/edit/:id',
    component: UserEditComponent,
  },
  {
    path: 'user/:id/tasks',
    component: UserTasksComponent
  },
  {
    path: 'user/:id/task/:id',
    component: UserTaskComponent
  },
  {
    path: 'user/:id/task/edit/:id',
    component: UserTaskEditComponent
  }
];

routes.push({
  path: '**',
  redirectTo: 'users'
})

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
