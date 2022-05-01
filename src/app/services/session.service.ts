import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginResponsePayload} from "../Modules/Authentification/payload/login-response.payload";
import {sessionResponsePayload} from "../Modules/payload/session/session-response-payload";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  url = 'http://localhost:8080/api/session/';

  constructor(private http: HttpClient,) {

  }

  getSession(id: number) :Observable<sessionResponsePayload> {
    return this.http.get<sessionResponsePayload>(this.url+id)
  }
}
