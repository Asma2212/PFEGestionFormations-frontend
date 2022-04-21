import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuradGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    return this.canLoad();
  }

  canLoad() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login/admin']);
    }
    return this.authService.isLoggedIn();
  }
  
}
