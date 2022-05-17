import {Department} from "../../../models/Departement";
import {Classe} from "../../../models/Classe";
import {genreModel} from "../../../models/Genre";

export class CandidatRequestSignupPayload{
  username: string;
  firstName:string;
  lastName :string;
  dateNaiss:Date ;
  email : string;
  password: string;
  genre : string;
  photo : string ;
  phone :string
/*
  MyImage : string ;
*/
  department:Department;
  classe: Classe ;

}
