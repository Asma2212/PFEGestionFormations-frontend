import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {loginRequestPayload} from '../Modules/Authentification/payload/login-request-payload';
import {Observable, throwError} from 'rxjs';
import {LoginResponsePayload} from '../Modules/Authentification/payload/login-response.payload';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RoleEnum} from "../models/RoleEnum";
import {Roles} from "../models/Roles";
import {Router} from "@angular/router";
import {User} from "../models/User";
import {data} from "jquery";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url="http://localhost:8080/api/auth/admin/";
  urlFormateur="http://localhost:8080/formateur/";
   a:string ;
  theUserRole:string;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  private roleFormateur: string;
  private p: void;

  constructor(private http: HttpClient, private localStorage: LocalStorageService, private router: Router) {

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

  loginFormateur(loginRequestPayload: loginRequestPayload) {
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
      }/*,error=>{

        this.router.navigate(['/']);
        console.log(error)
      }*/));
  }

  loginCandidat(loginRequestPayload: loginRequestPayload) {
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
      }/*,error=>{

        this.router.navigate(['/']);
        console.log(error)
      }*/));
  }
  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }
  getUserName() {
    return this.localStorage.retrieve('username');
  }     res:boolean



  isLoggedIn():boolean {
 /*   var res
    this.http.get("http://localhost:8080/test2/adminauthCeck").subscribe(data=>{res=true}
      , error => { console.log("its false")
        res=false ;
        }
    )
    return res*/
    return (!!this.getJwtToken()&& this.localStorage.retrieve("role")=="admin")

  }
  signup(signupRequestPayload: loginRequestPayload): Observable<any> {
    console.log(signupRequestPayload)

    return this.http.post<any>(this.url+'signup', signupRequestPayload);
  }
  currentUserDetail():Observable<any>{

    return this.http.get<User>(this.url+"currentUser/"+ this.getUserName());

  }
}
