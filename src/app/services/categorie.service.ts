import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Categorie } from "app/models/Categorie";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

//url = environment.urls.auth.endpoint + environment.urls.plateform.endpoint + environment.urls.plateform.formationApi;
url = 'http://localhost:8080/formation';
constructor(private http: HttpClient) {}

getAllCategories(): Observable<Categorie[]> {
  return this.http.get<Categorie[]>(this.url + '/AllCat');
}

saveCategorie(categorie : Categorie) : Observable<any>{

    return this.http.post<any>(this.url + '/savec1',categorie);
  }
}