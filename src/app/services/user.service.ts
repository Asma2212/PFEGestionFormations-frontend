import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "app/models/User";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class UserService {

    url="http://localhost:8080/api/auth/admin/";

    constructor(private http: HttpClient) {}

    updateFormateur(user : User) : Observable<any>{
        return this.http.post<any>(this.url + 'update/',user);
      }
      getUser(username : string) : Observable<any>{
        return this.http.get<any>('http://localhost:8080/api/test/user/'+username);
      }
  }