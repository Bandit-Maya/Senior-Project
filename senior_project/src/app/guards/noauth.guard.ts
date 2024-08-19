import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const noauthGuard: CanActivateFn = (route, state) => {
  let loginSvc= inject(LoginService);
  let router = inject(Router);
  if(loginSvc.currentToken){
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
