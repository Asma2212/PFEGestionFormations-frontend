import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginResponsePayload} from "../Modules/Authentification/payload/login-response.payload";
import {sessionResponsePayload} from "../Modules/payload/session/session-response-payload";
import {delay, map} from "rxjs/operators";
import {SessionFormation} from "../models/SessionFormation";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  url = 'http://localhost:8080/api/session/';
  urlCandidat='http://localhost:8080/candidat/all/session/';
  urlSession="http://localhost:8080/api/session/";
urlCandidat1="http://localhost:8080/candidat/";
urlEvaluation="http://localhost:8080/rating/";
  constructor(private http: HttpClient,) {

  }

  getSession(id: number) :Observable<SessionFormation> {
    return this.http.get<SessionFormation>(this.url+id)
  }

  getCandidaSession(username:string):Observable<SessionFormation[]>{
    return  this.http.get<SessionFormation[]>(this.urlCandidat+username);
  }
  ToInscrire(Username : string, sessionId:number):Observable<Object> {
    return this.http.get(this.urlSession+"inscription/"+sessionId+"/"+Username, { responseType: 'text' });
  }
  ToFavoris(Username:string , sessionId:number):Observable<any>{
    return  this.http.get(this.urlCandidat1+"add/favorit/"+Username+"/"+sessionId);
  }
  ToDeFavoris(Username:string , sessionId:number):Observable<any>{
    return  this.http.delete(this.urlCandidat1+"delete/favorit/"+Username+"/"+sessionId);

  }
  ToDesinscrire(Username : string, sessionId:number):Observable<Object> {
  return this.http.delete(this.urlSession+"deinscription/"+sessionId+"/"+Username, { responseType: 'text' });
}

ListInscription(Username:String):Observable<SessionFormation[]>{


  return  this.http.get<SessionFormation[]>(this.urlCandidat+Username);
}

ListFavoris(UserName:string):Observable<SessionFormation[]>{
    return this.http.get<SessionFormation[]>(this.urlCandidat1+"listFavorite/"+UserName);
}

  addrating(username: string, idSession: number, rating: string):Observable<any> {
    return  this.http.post(this.urlEvaluation+"add/"+idSession+"/"+username,rating);

  }

  showGlobalRating( idSession) :Observable<number>{
    return this.http.get<number>(this.urlEvaluation+"All/"+idSession)
  }

  showAllratings():Observable<any> {
    return this.http.get<any>(this.urlEvaluation+"All");

  }

  PutMyDefaultRating(username, idSession):Observable<number> {
    return this.http.get<number>(this.urlEvaluation+idSession+"/"+username);

  }
}
