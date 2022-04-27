import { Candidat } from "./Candidat";
import { Formateur } from "./Formateur";
import { NivDifficulteEnum } from "./NivDifficulteEnum";

export class SessionFormation{
    idSession : number;
    titreSession : string ;
    descriptionSession : string
    dateDebSession : Date ;
    dateFinSession : Date ;
    photoSession : string ;
    planning : string ;
    nivDifficulte : NivDifficulteEnum ;
    nbMaxCandidat : number ;
    listeFormateur : Formateur[];
    listeCandidat : Candidat[];
}