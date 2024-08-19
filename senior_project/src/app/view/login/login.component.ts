import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username:string = '';
  password:string = '';

  constructor(private loginSvc: LoginService, private router:Router){}

  async LoginUser(){
    let result = await this.loginSvc.LoginUser(this.username, this.password);

    if(result){
      const token = sessionStorage.getItem('token');
      const parsedToken = token?.split("\"")[3];
      const payload = atob(parsedToken!.split('.')[1]);
      const adminParse = payload!.split(',');
      const admin = adminParse[1].split(':')[1];
      sessionStorage.setItem('Admin', admin);
      if(admin === 'true'){
        console.log('Admin logged in');
        this.router.navigate(['/Admin']);
      } else {
        console.log("Reggo");
        this.router.navigate(['/']);
      }
      
    }
  }
}
