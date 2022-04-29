import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {loginRequestPayload} from '../Modules/Authentification/payload/login-request-payload';
import {Observable, throwError} from 'rxjs';
import {LoginResponsePayload} from '../Modules/Authentification/payload/login-response.payload';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RoleEnum} from "../models/RoleEnum";
import {Roles} from "../models/Roles";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url="http://localhost:8080/api/auth/admin/";
  urlFormateur="http://localhost:8080/formateur/";
   a:string ;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  private roleFormateur: string;

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {
  }
  login(loginRequestPayload: loginRequestPayload): Observable<boolean> {
    return this.http.post<LoginResponsePayload>(this.url+"signin", loginRequestPayload)
        .pipe(map(data => {
          console.log(data);
          this.a="ROLE_ADMIN";
          if (data.roles.includes(this.a)){
            this.localStorage.store('authenticationToken', data.accessToken);
            this.localStorage.store('username', data.username);
            this.localStorage.store('role',"admin");}



          else {


            throw new Error('An error occurred');
            return false;

          }

          return true;
        },error=>{
          console.log(error)
        }));
  }

  loginFormateur(loginRequestPayload: loginRequestPayload): Observable<boolean> {
    return this.http.post<any>(this.urlFormateur+"signin", loginRequestPayload)
      .pipe(map(data => {
        console.log(data);
        this.roleFormateur="ROLE_FORMATEUR";
        if (data.roles.includes(this.roleFormateur)){
          this.localStorage.store('authenticationToken', data.accessToken);
          this.localStorage.store('username', data.username);
          this.localStorage.store('role',"formateur");}



        else {


          throw new Error('An error occurred');
          return false;

        }

        return true;
      },error=>{
        console.log(error)
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
  signup(signupRequestPayload: loginRequestPayload): Observable<any> {
    console.log(signupRequestPayload)

    return this.http.post<any>(this.url+'signup', signupRequestPayload);
  }
}
