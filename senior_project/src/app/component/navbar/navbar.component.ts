import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  admin:string|null = null;
  loggedIn:boolean = false;

  constructor(private loginSvc:LoginService, private router:Router){}

  async logoutUser(){
    this.loginSvc.LogoutUser();
    location.reload();
    this.router.navigate(['/']);
    
  }
  ngOnInit(): void {
      if(sessionStorage.getItem('token') !== null){
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
      this.admin = sessionStorage.getItem('Admin');
  }
}
