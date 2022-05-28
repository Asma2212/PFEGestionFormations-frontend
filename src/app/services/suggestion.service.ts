import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  UrlSuggestion ="http://localhost:8080/suggestion/";

  constructor(private http: HttpClient) {

  }
  AllSuggestions():Observable<any>{
    return this.http.get<any>(this.UrlSuggestion+"/AllSuggestions");
  }
}
