import { Candidat } from "./Candidat";
import { Department } from "./Departement";

export class Classe {
    id : number ;
    name : string ;
    department : Department ;
    candidat : Candidat[]
}