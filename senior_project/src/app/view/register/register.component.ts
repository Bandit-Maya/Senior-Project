import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username:string = '';
  password:string = '';
  administrator:boolean = false;

  constructor(private loginSvc: LoginService, private router:Router){}
  
  async registerUser(){
    let result = await this.loginSvc.CreateUser(this.username, this.password, this.administrator);
    if(result){
      console.log(result);
      this.router.navigate(['/Login']);
    }
  }
}
