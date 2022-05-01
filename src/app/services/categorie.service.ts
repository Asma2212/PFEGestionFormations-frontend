import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Categorie } from "app/models/Categorie";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

//url = environment.urls.auth.endpoint + environment.urls.plateform.endpoint + environment.urls.plateform.formationApi;
url = 'http://localhost:8080/categorie';
constructor(private http: HttpClient) {}

getAllCategories(): Observable<Categorie[]> {
  return this.http.get<Categorie[]>(this.url + '/getAll');
}

saveCategorie(categorie : Categorie) : Observable<any>{

    return this.http.post<any>(this.url + '/save',categorie);
  }

  uploadVideo(fileEntry: File) : Observable<any> {
    const formData = new FormData()
    formData.append(  'file', fileEntry, fileEntry.name);
// HTTP Post call to upload the video

    return this.http.post("http://localhost:8080/api/videos", formData)
  }
}
