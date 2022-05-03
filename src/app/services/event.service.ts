import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {sessionResponsePayload} from "../Modules/payload/session/session-response-payload";
import {SessionFormation} from "../models/SessionFormation";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  url="http://localhost:8080/formateur/listSession/"
  constructor(private http: HttpClient) {}

  getEvents():Observable<SessionFormation[]> {

      return this.http.get<SessionFormation[]>(this.url+21)

    }


}
