//http://localhost:8080/api/test/allDep
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Classe } from "app/models/Classe";
import { Department } from "app/models/Departement";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClasseService {
    url = "http://localhost:8080/classe/"
    constructor(private http: HttpClient) {}


    getAllClasses(): Observable<Classe[]> {
      return this.http.get<Classe[]>(this.url + 'all');
    }
    saveClasse(c : Classe,id : number) : Observable<any>{

      return this.http.post<any>(this.url + 'add/'+id,c);
    }
    updateClasse(c : Classe,id : number) : Observable<any>{

      return this.http.post<any>(this.url + 'update/'+id,c);
    }
    deleteClasse(id : number) : Observable<any>{

      return this.http.delete<any>(this.url + 'delete/'+ id);
      }
deleteAllClasses(classes : Classe[] ) : Observable<any> {
        return this.http.post<any>(this.url + 'deleteAll', classes)
          }
        }