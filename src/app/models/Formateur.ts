import { genreModel } from "./Genre";
import { Specialite } from "./Specialite";

export class Formateur{
    id : number ;
    username : string ; //cin
    password : string ;
    firstName : string ;
    email : string ;
    lesSpecialites : Specialite[];
    role : string[];
    lastName : string ;
    numTel : string ;
    dateNaiss : Date ;
    genre : genreModel;
    bio : string ;
    photo : string ;
    cv : string ;
    etablissement : string ;
    
}

/**    private String email;
    private List<Specialite> specialites=new ArrayList<>();
    private Set<RoleModel> role;

    private String lastName;
    private String numTel;
    private Date dateNaiss;
    private genreModel genre;
    private String bio;
    private String photo;
    private String cv;
    private String etablissement; */