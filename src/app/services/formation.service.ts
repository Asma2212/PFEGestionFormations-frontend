import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Formation } from 'app/models/Formation';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  public dataForm:  FormGroup; 
      formData = new FormData();
      listform : Formation [];
  //url = environment.urls.url + environment.urls.formationApi;
  url = 'http://localhost:8080/formation/';
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
/**      console.log("listaa",formations);
      const data = {"formations" : formations};
		const options = {
			headers: new HttpHeaders({
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}),
			responseType: 'text' as 'json'
		}; */
		
		return this.http.post<any>(this.url + 'deleteAllFormations', formations)
    //.map(resp => {return resp;}).catch(err => {console.log(err);});
		
		//console.log('resp: ' + resp);
      //return this.http.delete<any>(this.url + 'deleteAllFormations');

      //return of({});
      }


}
