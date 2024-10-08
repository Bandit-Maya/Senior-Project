import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { VolunteerComponent } from './view/volunteer/volunteer.component';
import { CreateComponent } from './view/volunteer/create/create.component';
import { EditComponent } from './view/volunteer/edit/edit.component';
import { RegisterComponent } from './view/register/register.component';
import { noauthGuard } from './guards/noauth.guard';
import { AdminComponent } from './view/admin/admin.component';
import { adminguardGuard } from './guards/adminguard.guard';
const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'Login',
    component:LoginComponent
  },
  {
    path:'Register',
    component:RegisterComponent
  },
  {
    path:'Volunteer',
    component:VolunteerComponent
  },
  {
    path:'Volunteer/Create',
    canActivate:[adminguardGuard],
    component:CreateComponent
  },
  {
    path:'Volunteer/Edit',
    canActivate:[adminguardGuard],
    component:EditComponent
  },
  {
    path:'Admin',
    canActivate:[adminguardGuard],
    component:AdminComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
