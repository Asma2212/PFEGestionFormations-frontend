import { Classe } from "./Classe";
import { Department } from "./Departement";
import { genreModel } from "./Genre";

export class Candidat {
    id : number ;
    username : string ; //cin
    password : string ;
    firstName : string ;
    email : string ;
    role : string[];
    lastName : string ;
    numTel : number ;
    dateNaiss : Date ;
    genre : genreModel;
    bio : string ;
    photo : string ; 
    department : Department ; // TI , GC , GM , GE (enum) // niveauEtude : string ; // licence / master (enum)
    classe : Classe ; // genre : string ;
}