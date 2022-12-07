import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';

import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { UserTasksComponent } from './pages/user-tasks/user-tasks.component';
import { UserTaskComponent } from './pages/user-tasks/watch/user-task.component';
import { UserTaskEditComponent } from './pages/user-tasks/edit/user-task-edit.component';
import { UserEditComponent } from './pages/users/edit/user-edit.component';
import { UserCreateComponent } from './pages/users/create/user-create.component';
import { UserTaskCreateComponent } from './pages/user-tasks/create/user-task-create.component';

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
    path: 'user/edit/:userId',
    component: UserEditComponent,
  },
  {
    path: 'user/:userId/tasks',
    component: UserTasksComponent
  },
  {
    path: 'user/:userId/task/create',
    component: UserTaskCreateComponent
  },
  {
    path: 'user/:userId/task/:taskId',
    component: UserTaskComponent
  },
  {
    path: 'user/:userId/task/edit/:taskId',
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
