import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginResponsePayload} from "../Modules/Authentification/payload/login-response.payload";
import {sessionResponsePayload} from "../Modules/payload/session/session-response-payload";
import {map} from "rxjs/operators";
import {SessionFormation} from "../models/SessionFormation";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  url = 'http://localhost:8080/api/session/';
  urlCandidat='http://localhost:8080/candidat/all/session/';
  urlSession="http://localhost:8080/api/session/";

  constructor(private http: HttpClient,) {

  }

  getSession(id: number) :Observable<sessionResponsePayload> {
    return this.http.get<sessionResponsePayload>(this.url+id)
  }

  getCandidaSession(username:string):Observable<SessionFormation[]>{
    return  this.http.get<SessionFormation[]>(this.urlCandidat+username);
  }
  ToInscrire(Username : string, sessionId:number):Observable<Object> {
    return this.http.get(this.urlSession+"inscription/"+sessionId+"/"+Username, { responseType: 'text' });
  }
  ToDesinscrire(Username : string, sessionId:number):Observable<Object> {
  return this.http.delete(this.urlSession+"deinscription/"+sessionId+"/"+Username, { responseType: 'text' });
}
}
