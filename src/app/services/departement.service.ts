//http://localhost:8080/api/test/allDep
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Classe } from "app/models/Classe";
import { Department } from "app/models/Departement";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
    url = "http://localhost:8080/dep/"
    constructor(private http: HttpClient) {}

    getAllDepartements(): Observable<Department[]> {
        return this.http.get<Department[]>(this.url + 'all');
      }
      getAllClassesByDep(id:number): Observable<Classe[]> {
        return this.http.get<Classe[]>(this.url + 'allDep/classe/'+id);
      }
      getDepartementByClass(id:number): Observable<Department> {
        return this.http.get<Department>(this.url + 'getDep/Byclasse/'+id);
      }
      saveDepartement(dep : Department) : Observable<any>{

        return this.http.post<any>(this.url + 'add',dep);
      }
      updateDepartement(dep : Department) : Observable<any>{

        return this.http.post<any>(this.url + 'update',dep);
      }
      deleteDepartement(id : number) : Observable<any>{

        return this.http.delete<any>(this.url + 'delete/'+ id);
        }
deleteAllDepartements(dep : Department[] ) : Observable<any> {
          return this.http.post<any>(this.url + 'deleteAll', dep)
            }
}