import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Etablissement } from 'app/models/Etablissement';
import { Formateur } from 'app/models/Formateur';
import { Egenre } from 'app/models/GenreEnum';
import { Specialite } from 'app/models/Specialite';
import { FormateurService } from 'app/services/formateur.service';
import { SpecialiteService } from 'app/services/specialite.service';
import { TicketService } from 'app/services/Ticket.service';
import { UploadFileService } from 'app/services/upload-file.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  femme : string ="";
  homme : string ="";
  cin : number ;
firstName : string ;
lastName : string ;
listEtablissement : Etablissement[];
specialites : Specialite[];
formateur : Formateur ={
  id : 0,
  username : "",
  password : "",
  created : new Date() ,
  firstName : "",
  email : "",
  lesSpecialites : [],
  role : [],
  lastName : "",
  numTel : "",
  dateNaiss : null,
  genre : null,
  bio : "",
  photo : "",
  cv : "",
  etablissement : "",
  sessionFormationList : [],
  firstLogin : false 

}
  submitted: boolean = false;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  date1 : Date ;
  maxDate : Date ;
  fileInfos: Observable<any>;

  constructor(public formateurService : FormateurService, private router: Router,private specialiteService : SpecialiteService,private uploadService: UploadFileService,private localStorage: LocalStorageService) { }

  ngOnInit() { 
    this.specialiteService.getAllSpecialites().subscribe( data =>{
      this.specialites = data ; 
      console.log("speciaalie :",data) });
    this.listEtablissement = [
      {code : "IR.png",name:"ISET Rades"},
      {code:"IN.jpg",name : "ISET Nabeul"},
      {code:"IK.jfif",name:"ISET Klibia"},
      {code:"ESP.jpg",name:"Esprit"},
      {code:"p.png",name:"Autre"}
    ]
     // this.personalInformatio;
     const username =  this.localStorage.retrieve("username")
     this.formateurService.getFormateurByUsername(username).subscribe(data => {
       this.formateur = data ;
       this.date1 = new Date(this.formateur.dateNaiss)
       if(this.formateur.genre.name == "FEMME")
       this.femme = "Femme" ;
       else
       this.homme = "Homme"
       console.log(data);
     })

     //TEST
    /* this.formateurService.getFormateurById(185).subscribe(data => {
      this.formateur = data ;
      this.date1 = new Date(this.formateur.dateNaiss)
      if(this.formateur.genre.name == "FEMME")
      this.femme = "Femme" ;
      else
      this.homme = "Homme"
      console.log(data);
    })*/
     this.fileInfos = this.uploadService.getFiles();
  }

  nextPage() {

    var inputNom = (<HTMLInputElement>document.getElementById("nom"))?.validity.valid;
    var inputPrenom = (<HTMLInputElement>document.getElementById("prenom"))?.validity.valid;
    var inputEmail = (<HTMLInputElement>document.getElementById("email"))?.validity.valid;
    if(this.femme){

      console.log("geenre",Egenre.FEMME);
       this.formateur.genre = {id : 2 , name : Egenre.FEMME} ;
    }
    if(this.homme){
   
     this.formateur.genre = {id : 1 , name : Egenre.HOMME} ;
   }
   this.submitted = true ;
   this.formateur.dateNaiss = this.date1
   if(this.formateur.username && this.formateur.firstName.trim() && this.formateur.lastName.trim() && this.formateur.email.trim()
   && this.formateur.numTel && this.formateur.etablissement && this.formateur.lesSpecialites[0] && this.formateur.cv && inputEmail && inputNom && inputPrenom){

    localStorage.setItem('formateur', JSON.stringify(this.formateur));
          this.router.navigate(['firstLogin/photo']);
    
   }
  }

  upload() {
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    console.log("current file",this.currentFile);
    this.formateur.cv=this.currentFile.name ;
    this.uploadService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = "télécharger avec succées";
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progress = 0;
        console.log(err);
        if(err.error.message.includes("constraint"))
        this.message =" Ce fichier existe deja"
        else
        this.message = ' Un probleme est survenue';
        this.currentFile = undefined;
      });
      this.formateur.cv = this.currentFile.name ;
    this.selectedFiles = undefined;
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.formateur.cv = this.selectedFiles[0].name ;
  }

  allInputsValid(){
    if(this.formateur.username.trim() && this.formateur.firstName.trim() && this.formateur.lastName.trim() && this.formateur.email.trim()
    && this.formateur.numTel.trim() && this.formateur.etablissement.trim() && this.formateur.lesSpecialites[0] && this.formateur.cv)
    return true

  return false
  }
}
