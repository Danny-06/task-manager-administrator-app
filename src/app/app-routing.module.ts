import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';

import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { UserTasksComponent } from './pages/user-tasks/user-tasks.component';
import { UserTaskComponent } from './pages/user-task/user-task.component';
import { UserTaskEditComponent } from './pages/user-task/edit/user-task-edit.component';

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
    component: MainComponent,
    // canActivate: [AuthGuard],
    // data: { authGuardPipe: redirectUnauthorizedToLogin }
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
  redirectTo: 'main'
})

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
