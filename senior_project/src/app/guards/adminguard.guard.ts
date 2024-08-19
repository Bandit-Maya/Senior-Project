import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const adminguardGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let loginSvc= inject(LoginService);
  let admin = sessionStorage.getItem('Admin');
  if(admin === 'true' && loginSvc.currentToken){
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
