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
    url = "http://localhost:8080/api/test/"
    constructor(private http: HttpClient) {}

    getAllDepartements(): Observable<Department[]> {
        return this.http.get<Department[]>(this.url + 'allDep');
      }
      getAllClassesByDep(id:number): Observable<Classe[]> {
        return this.http.get<Classe[]>(this.url + 'all/dep/'+id);
      }
}