import * as internal from "stream";
import { Candidat } from "./Candidat";
import { Department } from "./Departement";

export class Rating {
    id : number ;
    sessionId : number ;
    username : string ;
    rating : number ;
}