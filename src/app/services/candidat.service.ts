import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Candidat } from "app/models/Candidat";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class CandidatService {
  
    //url = environment.urls.auth.endpoint + environment.urls.plateform.endpoint + environment.urls.plateform.formationApi;
    url = 'http://localhost:8080/candidat/';
    constructor(private http: HttpClient) {}
  
    getAllCandidats(): Observable<Candidat[]> {
      return this.http.get<Candidat[]>(this.url + 'all');
    }
  
    saveCandidat(candidat : Candidat) : Observable<any>{
  
      return this.http.post<any>(this.url + 'signup',candidat);
    }
    updateCandidat(candidat : Candidat) : Observable<any>{
  
      return this.http.post<any>(this.url + 'update1',candidat);
    }
  
    deleteCandidat(idf : number) : Observable<any>{
  
      return this.http.delete<any>(this.url + 'delete/'+ idf);
      }
  
      deleteAllCandidat(candidats : Candidat[] ) : Observable<any> {		
          return this.http.post<any>(this.url + 'deleteAllFormateurs', candidats)
  
        }
  
  }