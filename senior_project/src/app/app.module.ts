import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { NavbarComponent } from './component/navbar/navbar.component';
import { OpportunitiesManagementComponent } from './view/home/opportunities-management/opportunities-management.component';
import { VolunteerComponent } from './view/volunteer/volunteer.component';
import { CreateComponent } from './view/volunteer/create/create.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { EditComponent } from './view/volunteer/edit/edit.component';
import {MatCardModule} from '@angular/material/card';
import { RegisterComponent } from './view/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    VolunteerComponent,
    CreateComponent,
    EditComponent,
    RegisterComponent,
  ],
  imports: [
    MatCardModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    OpportunitiesManagementComponent,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
