import { Candidat } from "./Candidat";
import { Formateur } from "./Formateur";
import { Formation } from "./Formation";
import { NivDifficulteEnum } from "./NivDifficulteEnum";

export class SessionFormation{
    idSession : number;
    titreSession : string ;
    lieuSession : string;
    descriptionSession : string ; 
    dateDebSession : Date ;
    dateFinSession : Date ;
    photoSession : string ;
    planning : Map<string,string> ;
    programme : string ;
    nivDifficulte : NivDifficulteEnum ;
    nbMaxCandidat : number ;
    formationSession : Formation ;
    listeFormateurs : Formateur[];
    listeCandidat : Candidat[];
}