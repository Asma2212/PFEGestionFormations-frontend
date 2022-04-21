import { Injectable } from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {loginRequestPayload} from '../Modules/Authentification/payload/login-request-payload';
import {Observable} from 'rxjs';
import {LoginResponsePayload} from '../Modules/Authentification/payload/login-response.payload';
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {
  }
  login(loginRequestPayload: loginRequestPayload): Observable<boolean> {
    return this.http.post<LoginResponsePayload>('http://localhost:8080/candidat/signin', loginRequestPayload)
        .pipe(map(data => {
          this.localStorage.store('authenticationToken', data.accessToken);
          this.localStorage.store('username', data.username);
          // to be continue
          return true;
        }));
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }
  getUserName() {
    return this.localStorage.retrieve('username');
  }
    isLoggedIn() {
        return !!this.getJwtToken();
    }
}
