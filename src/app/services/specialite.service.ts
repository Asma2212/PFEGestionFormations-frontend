import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Specialite } from 'app/models/Specialite';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {

  //url = environment.urls.auth.endpoint + environment.urls.plateform.endpoint + environment.urls.plateform.formationApi;
  url = 'http://localhost:8080/specialite/';
  constructor(private http: HttpClient) {}

  getAllSpecialites(): Observable<Specialite[]> {
    return this.http.get<Specialite[]>(this.url + 'all');
  }

  saveSpecialite(sp : Specialite) : Observable<any>{

    return this.http.post<any>(this.url + 'add',sp);
  }
 /* saveFormateur(formateur : Formateur) : Observable<any>{

    return this.http.post<any>(this.url + 'signup',formateur);
  }
  updateFormateur(formateur : Formateur) : Observable<any>{

    return this.http.post<any>(this.url + 'update',formateur);
  }

  deleteFormateur(idf : number) : Observable<any>{

    return this.http.delete<any>(this.url + 'deleteFormateur/'+ idf);
    }

    deleteAllFormateur(formateurs : Formateur[] ) : Observable<any> {		
		return this.http.post<any>(this.url + 'deleteAllFormateurs', formateurs)

      }*/
 deleteSpecialite(id : number) : Observable<any>{

        return this.http.delete<any>(this.url + 'delete/'+ id);
        }
  deleteAllSpecialites(specialites : Specialite[] ) : Observable<any> {
          return this.http.post<any>(this.url + 'deleteAll', specialites)
            }
}