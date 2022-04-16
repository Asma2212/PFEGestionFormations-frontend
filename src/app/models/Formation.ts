import { Categorie } from "./Categorie";

export class Formation {
    idFormation : number ;
    titre : String ;
    charge_horaire : String ;
    details : String ;
    image : String ;
    listCategories : Categorie[];
}