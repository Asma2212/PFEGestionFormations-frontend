import { Classe } from "./Classe";
import { Department } from "./Departement";

export class Candidat {
    id : number ;
    username : string ; //cin
    password : string ;
    name : string ;
    email : string ;
    role : string[];
    lastName : string ;
    numTel : number ;
    dateNaiss : Date ;
    genre : string;
    bio : string ;
    photo : string ; 
    department : Department ; // TI , GC , GM , GE (enum) // niveauEtude : string ; // licence / master (enum)
    classe : Classe ; // genre : string ;
}