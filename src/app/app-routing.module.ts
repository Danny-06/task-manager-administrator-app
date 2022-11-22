import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';

import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { UserTasksComponent } from './pages/user-tasks/user-tasks.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent,
    // canActivate: [AuthGuard],
    // data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'tasks/:id',
    component: UserTasksComponent
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
