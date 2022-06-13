import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidat } from 'app/models/Candidat';
import { Formateur } from 'app/models/Formateur';
import { Egenre } from 'app/models/GenreEnum';
import { SessionFormation } from 'app/models/SessionFormation';
import { CandidatService } from 'app/services/candidat.service';
import { FormateurService } from 'app/services/formateur.service';
import { SessionFormationService } from 'app/services/SessionFormation.service';
import { UploadFileService } from 'app/services/upload-file.service';
import { LocalStorageService } from 'ngx-webstorage';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Classe } from 'app/models/Classe';
import { Department } from 'app/models/Departement';
import { DepartementService } from 'app/services/departement.service';

@Component({
  selector: 'app-profil-candidat',
  templateUrl: './profil-candidat.component.html',
  styleUrls: ['./profil-candidat.component.scss']
})
export class ProfilCandidatComponent implements OnInit {
  selectedFiles: FileList;
  candidat : Candidat
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
  sessionsCandidat : SessionFormation[]
  sessions : SessionFormation[]
  listC : Classe[] = [] ;
  listD : Department[] = [];
  d: Department ;
  c:Classe ;
  depSelected : boolean = false ;
  candidats: Candidat[];
  listDep : Department[] = [];
  listClass : Classe[] = [];
  listClassAll : Classe[] =[];
  
  constructor(private sessionService : SessionFormationService,private candidatService : CandidatService ,private uploadService : UploadFileService,private messageService : MessageService ,private localStorage:LocalStorageService,private confirmationService : ConfirmationService,private router : Router,private departementService : DepartementService) { }

  ngOnInit(): void {
    this.nbPasser=0; 
    this.nbAvenir=0;
    const username = this.localStorage.retrieve("username")
    this.candidatService.getCandidatByUsername(username).subscribe(data => {
      this.candidat = data ;
      console.log("candidat :",this.candidat)
      this.listD.push(this.candidat.department)
      this.listC.push(this.candidat.classe)
      this.listClass = this.listD[0].classes ;
      this.depSelected = true ;
      console.log("classs :",this.listClass,this.listC)
      this.departementService.getAllDepartements().subscribe( data =>{
        this.listDep = data ;
        console.log("departement :",data)
      this.listDep.forEach(d => {
       d.classes.forEach(c => {
         this.listClassAll.push(c)
       });
        
      }); });
      localStorage.setItem("idC",data.id.toString());
      this.sessionService.getSessions().subscribe(data => {
        this.sessions = data
      this.sessionsCandidat = this.sessions.filter(s => s.listeCandidat.filter(c=> c.id == this.candidat.id).length == 1)
        console.log("seesss",this.sessionsCandidat)
      this.age = new Date().getFullYear() - new Date(this.candidat.dateNaiss).getFullYear()
      this.date1 = new Date(this.candidat.dateNaiss)
      if(this.candidat.genre.name == "FEMME")
      this.femme = "Femme" ;
      else
      this.homme = "Homme"

        this.candidat.sessionFormationList = this.sessionsCandidat
      
      console.log("aaa",this.candidat.sessionFormationList);
     this.nbPasser = this.candidat.sessionFormationList.filter(s => 
        new Date(s.dateFinSession) < new Date()).length ;
        this.nbAvenir = this.candidat.sessionFormationList.filter(s => 
          new Date(s.dateDebSession) > new Date()).length
          this.nbEncours = this.candidat.sessionFormationList.filter(s => 
            new Date(s.dateFinSession) >= new Date() && new Date(s.dateDebSession) <= new Date()).length ;
          })
    
  })
    this.fileInfos = this.uploadService.getFiles();
  }
  testImage(t : string){
    return t.includes("image") ;
 }
 saveChanges(){
   if(this.imgURL)
   this.upload1();
   if(this.file)
   this.candidat.photo = this.file.name
   if(this.candidat.genre.name == "FEMME"){
     this.candidat.genre = {id : 2 , name : Egenre.FEMME} ;
  }
  if(this.candidat.genre.name == "HOMME"){
  
   this.candidat.genre = {id : 1 , name : Egenre.HOMME} ;
  }
 console.log(this.candidat)
 if((this.nouvPass.trim()) && (this.nouvPass2.trim() && (this.ancPass.trim()))){
 if(this.nouvPass == this.nouvPass2){
   this.candidat.password = this.nouvPass
  this.candidatService.updateCandidatPassword(this.candidat,this.ancPass,this.nouvPass).subscribe(data =>{
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'vos informations sont bien modifier', life: 3000});
    this.router.navigateByUrl('/candidat/profil') 
  },
  error =>{
    console.log(error)
if(error.error.includes("invalide"))
this.confAnc = false ;
if(error.error.includes("differente"))
this.diffPass = false ;
  }
  )
}}
else{
this.candidatService.updateCandidat(this.candidat).subscribe( data =>{
  console.log("photooo",this.candidat.photo)
  console.log(data)
  this.messageService.add({severity:'success', summary: 'Successful', detail: 'vos informations sont bien modifier', life: 3000});
  this.router.navigate(["candidat/profil"]) 
},
error =>{
  this.messageService.add({severity:'error', summary: 'Echoué', detail: error.error.message, life: 3000});
}
  )
 }

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

departementSelected(dep){
  console.log("thhis")
  if(dep[0]){
    this.listC = []
  this.d = dep[0];
  console.log("hhheeey",this.d);
  //console.log("cc",this.candidat.department.id);
  this.depSelected = true ;
  this.listClass = dep[0].classes ;
 this.candidat.department = dep[0];
}}
classeSelected(classe : Classe){
  if(classe[0]){
  console.log("classssseeee",classe[0].name);
  this.c = classe[0];
  //console.log("cc",this.candidat.department.id);
 this.candidat.classe = classe[0];
}
}
}
