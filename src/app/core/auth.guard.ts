import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { Token } from '@angular/compiler';
import { TokenModel } from './token.model';
import { AuthorService } from '../shared/author/author.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router)
  const token = localStorage.getItem("token-loggedin");
  const user = localStorage.getItem("user-loggedin");
  if(token != null && user != null) {
    authService.token = new TokenModel(token, user);
    return true;
  }
  return router.navigate(['/login']);
};