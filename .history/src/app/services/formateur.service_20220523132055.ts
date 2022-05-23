import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formateur } from 'app/models/Formateur';
import { Observable } from 'rxjs';
import {FileSystemFileEntry} from 'ngx-file-drop';
import { SessionFormation } from 'app/models/SessionFormation';

@Injectable({
  providedIn: 'root'
})

export class FormateurService {
  //url = environment.urls.auth.endpoint + environment.urls.plateform.endpoint + environment.urls.plateform.formationApi;
  url = 'http://localhost:8080/formateur/';
  private id:number ;
  constructor(private http: HttpClient) {}

  getAllFormateurs(): Observable<Formateur[]> {
    return this.http.get<Formateur[]>(this.url + 'all');
  }

  saveFormateur(formateur : Formateur) : Observable<any>{
    return this.http.post<any>(this.url + 'signup1',formateur);
  }

  updateFormateur(formateur : Formateur) : Observable<any>{
    
    return this.http.post<any>(this.url + 'update1/'+formateur.id,formateur);
  }
  updateFormateurPassword(formateur : Formateur,anc : string ,nouv : string) : Observable<any>{
    
    return this.http.post<any>(this.url + 'updatePassword/'+anc+'/'+nouv,formateur);
  }

  deleteFormateur(idf : number) : Observable<any>{
    return this.http.delete<any>(this.url + 'delete/'+ idf);
  }

  getFormateurById(idF : number): Observable<Formateur> {
    return this.http.get<Formateur>(this.url +idF);
  }
  getFormateurByUsername(u : string): Observable<Formateur> {
    return this.http.get<Formateur>(this.url+"get/"+u);
  }
  getSessionByFormateur(id: number) :Observable<SessionFormation[]> {
  return this.http.get<SessionFormation[]>(this.url+"listSession/"+id)
  }
  /*deleteAllFormateur(formateurs : Formateur[] ) : Observable<any> {		
		return this.http.post<any>(this.url + 'deleteAllFormateurs', formateurs)
  } */





}
