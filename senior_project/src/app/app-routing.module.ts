import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { VolunteerComponent } from './view/volunteer/volunteer.component';
import { CreateComponent } from './view/volunteer/create/create.component';
import { EditComponent } from './view/volunteer/edit/edit.component';
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
    path:'Volunteer',
    component:VolunteerComponent
  },
  {
    path:'Volunteer/Create',
    component:CreateComponent
  },
  {
    path:'Volunteer/Edit',
    component:EditComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
