import { Specialite } from "./Specialite";

export class Formateur{
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
    photo : string ;
    bio : string ;
    cv : string ;
    specialites : Specialite[];
    
}