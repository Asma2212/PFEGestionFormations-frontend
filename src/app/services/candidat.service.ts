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
  
      return this.http.post<any>(this.url + 'signup1',candidat);
    }
    updateCandidat(candidat : Candidat) : Observable<any>{
  
      return this.http.post<any>(this.url + 'update1/'+ candidat.id,candidat);
    }
  
    deleteCandidat(idc : number) : Observable<any>{
  
      return this.http.delete<any>(this.url + 'delete/'+ idc);
      }
  
      deleteAllCandidat(candidats : Candidat[] ) : Observable<any> {		
          return this.http.post<any>(this.url + 'deleteAllFormateurs', candidats)
  
        }
        getCandidatByUsername(u : string): Observable<Candidat> {
          return this.http.get<Candidat>(this.url+"get/"+u);
        }
        getCandidatByEmail(email : string): Observable<Candidat> {
          return this.http.get<Candidat>(this.url+"getEmail/"+email);
        }
        updateCandidatPassword(candidat : Candidat,anc : string ,nouv : string) : Observable<any>{
    
          return this.http.post<any>(this.url + 'updatePassword/'+anc+'/'+nouv,candidat);
        }
        updateCandidatPass(candidat : Candidat) : Observable<any>{
    
          return this.http.post<any>(this.url + 'updatePass',candidat);
        }
        envoyerCodeCandidat(candidat : Candidat) : Observable<any>{
    
          return this.http.post<any>(this.url + 'codeCandidat',candidat);
        }
  
  }