import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formateur } from 'app/models/Formateur';
import { Egenre } from 'app/models/GenreEnum';
import { SessionFormation } from 'app/models/SessionFormation';
import { Specialite } from 'app/models/Specialite';
import { FormateurService } from 'app/services/formateur.service';
import { SpecialiteService } from 'app/services/specialite.service';
import { UploadFileService } from 'app/services/upload-file.service';
import { LocalStorageService } from 'ngx-webstorage';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profil-formateur',
  templateUrl: './profil-formateur.component.html',
  styleUrls: ['./profil-formateur.component.scss']
})
export class ProfilFormateurComponent implements OnInit {
  selectedFiles: FileList;
  formateur : Formateur
  date1 : Date ;
  femme : string;
  homme : string;
  fileInfos : Observable<any> ;
  nbAvenir : number ;
  nbPasser : number ;
  age : number ; 
  pass1 : string ;
  pass2 : string ; 
  session : SessionFormation[] ;

  file: File = null;
  public imagePath;
  imgURL: any = null ;
  currentFile: File;
  message = '';
  progress = 0;
  selectedFile : FileList ;
  nbEncours : number =0;

  ancPass: string ="";
  nouvPass: string ="";
  nouvPass2 : string ="";
  confAnc : boolean = true;
  diffPass : boolean = true;
  username : string ;
  specialites : Specialite[];
  
  constructor(private formateurService : FormateurService ,private uploadService : UploadFileService,private messageService : MessageService,private localStorage:LocalStorageService,private confirmationService : ConfirmationService,private router : Router,private specialiteService : SpecialiteService) { }

  ngOnInit(): void {
    this.nbPasser=0;
    this.nbAvenir=0;
    this.specialiteService.getAllSpecialites().subscribe( data =>{
      this.specialites = data ; 
      console.log("speciaalie :",data) });
    this.username = this.localStorage.retrieve("username")
    this.formateurService.getFormateurByUsername(this.username).subscribe(data => {
     localStorage.setItem("idF",data.id.toString());
      console.log("daataaa2",data)
      this.formateur = data ;
      this.age = new Date().getFullYear() - new Date(this.formateur.dateNaiss).getFullYear()
      this.date1 = new Date(this.formateur.dateNaiss)
      if(this.formateur.genre.name == "FEMME")
      this.femme = "Femme" ;
      else
      this.homme = "Homme"

      this.formateurService.getSessionByFormateur(this.formateur.id).subscribe(data =>{
        this.formateur.sessionFormationList = data
      
      console.log("aaa",this.formateur.sessionFormationList);
     this.nbPasser = this.formateur.sessionFormationList.filter(s => 
        new Date(s.dateFinSession) < new Date()).length ;
        this.nbAvenir = this.formateur.sessionFormationList.filter(s => 
          new Date(s.dateDebSession) > new Date()).length
          this.nbEncours = this.formateur.sessionFormationList.filter(s => 
            new Date(s.dateFinSession) >= new Date() && new Date(s.dateDebSession) <= new Date()).length ;

    })
  })
    this.fileInfos = this.uploadService.getFiles();
  }
  testImage(t : string){
    return t.includes("image") ;
 }

 getFormateur(){
  this.formateurService.getFormateurByUsername(this.username).subscribe(data => {
    localStorage.setItem("idF",data.id.toString());
     console.log("daataaa2",data)
     this.formateur = data ;
 })
}
 saveChanges(){
  
   console.log("***",this.formateur)
   if(this.imgURL)
   this.upload1();
   if(this.file)
   this.formateur.photo = this.file.name
   if(this.formateur.genre.name == "FEMME"){
    this.formateur.genre = {id : 2 , name : Egenre.FEMME} ;
 }
 if(this.formateur.genre.name == "HOMME"){
 
  this.formateur.genre = {id : 1 , name : Egenre.HOMME} ;
 }
 console.log(this.formateur)
 if((this.nouvPass.trim()) && (this.nouvPass2.trim() && (this.ancPass.trim()))){
 if(this.nouvPass == this.nouvPass2){
   this.formateur.password = this.nouvPass
  this.formateurService.updateFormateurPassword(this.formateur,this.ancPass,this.nouvPass).subscribe(data =>{
    //window.location.reload()
    this.nouvPass = ""
    this.nouvPass2 = ""
    this.ancPass = ""
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'vos informations sont bien modifier', life: 3000});
  },
  error =>{
    console.log("aa",error)
    if(error.error.text && error.error.text.includes("modifiée")){
window.location.reload()
this.messageService.add({severity:'success', summary: 'Successful', detail: 'vos informations sont bien modifier', life: 3000});
    }
    else {
if(error.error.includes("invalide"))
this.confAnc = false ;
if(error.error.includes("differente"))
this.diffPass = false ;
  }}
  )
}}
else{
this.formateurService.updateFormateur(this.formateur).subscribe( data =>{
  console.log("photooo",this.formateur.photo)
  console.log(data)
  this.messageService.add({severity:'success', summary: 'Succés', detail: 'vos informations sont bien modifier', life: 3000});
  window.location.reload()
},
error =>{
  this.messageService.add({severity:'error', summary: 'Echoué', detail: error.error.message, life: 3000});
}
  )
 
}}
initialiseDonn(){
  this.ancPass = ""
  this.nouvPass = ""
  this.nouvPass2= ""
}
 onUpload(event){
  this.selectedFile = event.target.files;
  this.file = <File>event.target.files[0]
  console.log(this.file)
  var mimeType = event.target.files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    this.message = "Only images are supported.";
    return;
  }

  var reader = new FileReader();
  
  this.imagePath = this.file;
  reader.readAsDataURL(this.file); 
  reader.onload = (_event) => { 
    this.imgURL = reader.result;
    console.log("imaage",this.imgURL.url) 
  }
}
upload1() {
  this.currentFile = this.selectedFile.item(0);
  console.log("current file",this.currentFile);
  
  this.uploadService.upload(this.currentFile).subscribe(
    event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.message = "télécharger avec succées";
      }
    },
    err => {
      this.progress = 0;
      console.log(err);
      if(err.error.message.includes("constraint"))
      this.message =" Cette image existe deja"
      else
      this.message = ' Un probleme est survenue';
      this.currentFile = undefined;
    });
  this.selectedFile = undefined;
}

deco(){
  console.log("I entered")
  this.confirmationService.confirm({
    acceptLabel:"Oui",
    acceptButtonStyleClass:"p-button-danger",
    rejectLabel:"Non",
    rejectButtonStyleClass:"p-button-info",
    message: 'Êtes-vous sûr de vouloir quitter?',
    header: 'Deconnexion',
    accept: () => {
      this.localStorage.clear("authenticationToken")
      this.localStorage.clear("username")
      this.localStorage.clear("role")
      localStorage.removeItem("idF")
      this.router.navigate(["/home"])

    }
  });
}

selectFile(event) {
  this.selectedFiles = event.target.files;
  this.formateur.cv = this.selectedFiles[0].name ;
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
}
