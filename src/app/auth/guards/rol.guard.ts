import { AuthService } from './../../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class RolGuard implements CanActivate {
  private rol;
  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.rol = this.authService.getRol();
    if(this.rol == 'admin'){
      return true
    }else if(this.rol == null){
      this.router.navigate(['/auth/login']);
      return false;
    }else{
      this.router.navigate(['/auth/inicio']);
      return false;
    }
  }
  
}
