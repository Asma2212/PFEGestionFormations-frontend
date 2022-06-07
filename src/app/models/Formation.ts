import { Categorie } from "./Categorie";
import { SessionFormation } from "./SessionFormation";

export class Formation {
    idFormation : number ;
    titre : String ;
    charge_horaire : String ;
    details : String ;
    createdDate : Date ;
    image : String ;
    listCategories : Categorie[];
    sessionFormations :SessionFormation[]
}