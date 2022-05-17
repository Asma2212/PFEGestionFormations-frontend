import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardCandidatGuard implements CanActivate {
  constructor(private http: HttpClient,private authService: AuthService, private router: Router) { }

  canActivate() {

    return this.canLoad();

  }

  canLoad() {
    if (!this.authService.isLoggedInCandidat()) {
      this.router.navigate(['/register/candidat']);
    }
    return this.authService.isLoggedInCandidat();
  }
}
