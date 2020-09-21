import { AuthService } from './../../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class TokenGuard implements CanActivate {
  private token;
  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.token = this.authService.getToken();
    console.log(this.token)
    if(this.token == '' || this.token == null){
      this.router.navigate(['/auth/login'])
      return false
    }else{
      return true
    }
  }
  
}
