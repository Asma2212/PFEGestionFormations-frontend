import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../../../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class CandidatGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (this.authService.isLoggedInCandidat()) {
      this.router.navigate(['/candidat/profil']);
    }
   /* if (this.authService.isLoggedInFormateur()) {
      this.router.navigate(['/formateur/profil']);
    }*/
    return !this.authService.isLoggedInCandidat();
  }

}
