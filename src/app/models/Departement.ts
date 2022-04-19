import { Candidat } from "./Candidat";
import { Classe } from "./Classe";

export class Department {
    id : number ;
    name : string ;
    classes : Classe[];
    candidat : Candidat[];
}