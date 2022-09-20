import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { TaskSetupComponent } from './task-setup/task-setup.component';

const routes: Routes = [
  { path:'',component:HomeComponent},
  { path:'login',component:LoginComponent},
  { path:'task',component:TaskSetupComponent , canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
