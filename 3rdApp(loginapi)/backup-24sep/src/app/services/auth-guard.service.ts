import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
  	if(this.authService.isLoggedIn()) return true;
  	else this.router.navigate(['/login']);
  }

}
@Injectable()
export class AuthGuardLoginService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
  	if(!this.authService.isLoggedIn()) return true;
  	else this.router.navigate(['/']);
  }

}
