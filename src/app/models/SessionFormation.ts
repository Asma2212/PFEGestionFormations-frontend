import { Candidat } from "./Candidat";
import { Formateur } from "./Formateur";
import { Formation } from "./Formation";
import { NivDifficulteEnum } from "./NivDifficulteEnum";

export class SessionFormation{
    idSession : number;
    titreSession : string ;
    lieuxSession : string;
    descriptionSession : string ; 
    dateDebSession : Date ;
    dateFinSession : Date ;
    photoSession : string ;
    planning : Map<string,string> ;
    programme : string ;
    nivDifficulte : NivDifficulteEnum ;
    nbMaxCandidat : number ;
    formationSession : Formation ;
    listeFormateur : Formateur[];
    listeCandidat : Candidat[];
}