import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Formation } from 'app/models/Formation';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import {SessionFormation} from "../models/SessionFormation";

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  public dataForm:  FormGroup;
      formData = new FormData();
      listform : Formation [];
  //url = environment.urls.url + environment.urls.formationApi;
  url = 'http://localhost:8080/formation/';
  urlSession="http://localhost:8080/api/session/formation/";
  constructor(private http: HttpClient) {}

  getAllFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(this.url + 'All');
  }

  saveFormation(formation : Formation) : Observable<any>{

    return this.http.post<any>(this.url + 'save1',formation);
  }

  saveFormationData(formData : FormData) : Observable<any>{

    return this.http.post<FormData>(this.url + 'save',formData, {
      reportProgress: true,
      observe: 'events'
    }

);
  }

  updateFormation(formation : Formation) : Observable<any>{

    return this.http.post<any>(this.url + 'update1',formation);
  }

  deleteFormation(idf : number) : Observable<any>{

    return this.http.delete<any>(this.url + 'deleteFormation/'+ idf);
    }

    deleteAllFormation(formations : Formation[] ) : Observable<any> {
		return this.http.post<any>(this.url + 'deleteAllFormations', formations)

      }
      getAllSessionsOfFormation(idF:number):Observable<SessionFormation[]>{
        return this.http.get<SessionFormation[]>(this.urlSession +idF);

      }

}
