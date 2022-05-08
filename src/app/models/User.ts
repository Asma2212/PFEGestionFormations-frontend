import {genreModel} from "./Genre";

export class User{
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
  photo:string;
  bio : string ;
  created:Date;
}
