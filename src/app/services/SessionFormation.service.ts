import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SessionFormation } from "app/models/SessionFormation";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class SessionFormationService {
    url = 'http://localhost:8080/sessionFormation/';

    constructor(private http: HttpClient) {}
  
    getSessions(): Observable<SessionFormation[]> {
      return this.http.get<SessionFormation[]>(this.url + 'all');
    }
  
    saveFormateur(session : SessionFormation) : Observable<any>{
      return this.http.post<any>(this.url + 'add',session);
    }
  
    updateFormateur(session : SessionFormation) : Observable<any>{
      
      return this.http.post<any>(this.url + 'update/'+session.idSession,session);
    }
  
    deleteFormateur(ids : number) : Observable<any>{
      return this.http.delete<any>(this.url + 'delete/'+ ids);
    }
  }
