import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashComponent } from './dash/dash.component';
import { HomeComponent } from './home/home.component';
import { AppListComponent } from './applist/applist.component';

import { CanActivateViaAuthGuard } from './auth/can-activate-via-auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dash', component: DashComponent, canActivate: [ CanActivateViaAuthGuard ]},
  { path: 'apps', component: AppListComponent, canActivate: [ CanActivateViaAuthGuard ]},
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '/home' },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
