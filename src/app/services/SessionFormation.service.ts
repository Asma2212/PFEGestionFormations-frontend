import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SessionFormation } from "app/models/SessionFormation";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class SessionFormationService {
    url = 'http://localhost:8080/api/session/';

    constructor(private http: HttpClient) {}

    getSessions(): Observable<SessionFormation[]> {
      return this.http.get<SessionFormation[]>(this.url + 'all');
    }

    saveSession(session : SessionFormation) : Observable<any>{
      return this.http.post<any>(this.url + 'add',session);
    }

    updateSession(session : SessionFormation) : Observable<any>{

      return this.http.post<any>(this.url + 'update/'+session.idSession,session);
    }

    deleteSession(idS : number) : Observable<any>{
      return this.http.delete<any>(this.url + 'delete/'+ idS);
    }


}
