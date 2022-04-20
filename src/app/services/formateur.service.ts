import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formateur } from 'app/models/Formateur';
import { Observable } from 'rxjs';
import {FileSystemFileEntry} from 'ngx-file-drop';

@Injectable({
  providedIn: 'root'
})

export class FormateurService {
  //url = environment.urls.auth.endpoint + environment.urls.plateform.endpoint + environment.urls.plateform.formationApi;
  url = 'http://localhost:8080/formateur/';
  constructor(private http: HttpClient) {}

  getAllFormateurs(): Observable<Formateur[]> {
    return this.http.get<Formateur[]>(this.url + 'all');
  }

  saveFormateur(formateur : Formateur) : Observable<any>{
    return this.http.post<any>(this.url + 'signup',formateur);
  }

  updateFormateur(formateur : Formateur) : Observable<any>{
    return this.http.post<any>(this.url + 'update/'+formateur.id,formateur);
  }

  deleteFormateur(idf : number) : Observable<any>{
    return this.http.delete<any>(this.url + 'delete/'+ idf);
  }

  /*deleteAllFormateur(formateurs : Formateur[] ) : Observable<any> {		
		return this.http.post<any>(this.url + 'deleteAllFormateurs', formateurs)
  } */





}
