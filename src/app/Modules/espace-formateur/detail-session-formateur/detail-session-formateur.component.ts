import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionFormation } from 'app/models/SessionFormation';
import { SessionService } from 'app/services/session.service';
import { SessionFormationService } from 'app/services/SessionFormation.service';
import { UploadFileService } from 'app/services/upload-file.service';
import { map } from 'rxjs/operators';
import { error } from 'console';
import { Observable } from 'rxjs';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { NivDifficulteEnum } from 'app/models/NivDifficulteEnum';
import { ListCandidatsDialogComponent } from '../list-candidats-dialog/list-candidats-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Formateur } from 'app/models/Formateur';

@Component({
  selector: 'app-detail-session-formateur',
  templateUrl: './detail-session-formateur.component.html',
  styleUrls: ['./detail-session-formateur.component.scss'],
  providers: [DialogService],
})
export class DetailSessionFormateurComponent implements OnInit {
id : number ;
session : SessionFormation ;
fileInfos : Observable<any>
planningDialog : boolean ;
map : any
titre : string ;
description : string ;
key : string ="";
value : string ="";
plan : Map<string,string>  ;
uploadedFiles: any[] = [];
file: File = null;
fileCV: File = null;
public imagePath;
imgURL: any = null;
selectedFiles: FileList;
currentFile: File;
progress = 0;
message = '';
selectedFiles1: FileList;
currentFile1: File;
progress1 = 0;
message1 = '';
cvFile: File ;
nivDifficulte : NivDifficulteEnum[] = [NivDifficulteEnum.facile,NivDifficulteEnum.moyen,NivDifficulteEnum.avance];
sessionSimilaire : SessionFormation[];
selectedFormateurs : Formateur[];
ref: DynamicDialogRef;
namePhoto:string;
selectedFile : FileList ;

  constructor(private route: ActivatedRoute,private sessionService : SessionService,private sessionForamtionService : SessionFormationService,private uploadService : UploadFileService,private confirmationService:ConfirmationService,private dialogService: DialogService,private sessionFormationService : SessionFormationService,private messageService : MessageService) { }

  ngOnInit(): void {
    this.planningDialog = false ;
    this.getbyIDSession()
    this.fileInfos = this.uploadService.getFiles();
  }


  getbyIDSession() {
    this.id = this.route.snapshot.params['id']
    this.sessionService.getSession(this.id).subscribe(data => {
      console.log("Message", data)
      this.session = data
this.sessionForamtionService.getSessions().subscribe(d =>{
  this.sessionSimilaire = d.filter(s => ((s.formationSession.titre == this.session.formationSession.titre) && (s.idSession != this.session.idSession)))
})

    }, error => {
      console.log(error.error.message)
    })

  }
  testImage(t : string){
    return t.includes("image") ;
 }

 ajouterPlanning(){
this.planningDialog = true ;
 }
 savePlanning(){
   Object.keys(this.session.planning).forEach(key => {
    if(this.key == key) delete this.session.planning[key];
 });
   console.log("base",this.session.planning,"mnaa",this.plan)
   this.session.planning[this.titre] = this.description;
  console.log("base",this.session.planning,"mnaa",this.plan)
//this.session.planning = this.plan ;
   this.sessionForamtionService.updateSession(this.session).subscribe(
     data =>{
       console.log("added perfectly",data)
       this.hidePlanning()
     },
     error => {
       console.log("erreur", error.error.message)
     }
   )

   
 }

 UpdatePlanning(keyPlanning:string , valuePlanning:string){
   this.planningDialog = true ;
   this.key = keyPlanning ;
   this.value = valuePlanning ;
   this.titre = keyPlanning ;
   this.description = valuePlanning ;
 }

 deletePlanning(keyPlanning:string){
  this.confirmationService.confirm({
    acceptLabel:"Supprimer",
    acceptButtonStyleClass:"p-button-danger",
    rejectLabel:"Annuler",
    rejectButtonStyleClass:"p-button-info",
    message: 'etes-Vous sur vous voulez supprimer' + keyPlanning + '?',
    header: 'Confirmer',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      Object.keys(this.session.planning).forEach(key => {
        if(keyPlanning == key) delete this.session.planning[key];
     });
      console.log("base",this.session.planning,"mnaa",this.plan)
       this.sessionForamtionService.updateSession(this.session).subscribe(
         data =>{
           console.log("added perfectly",data)
           this.getbyIDSession()
           this.hidePlanning()
         },
         error => {
           console.log("erreur", error.error.message)
         }
       )

    }
});
 }

 hidePlanning(){
   this.titre = ""
   this.description = ""
   this.key ="";
   this.value="";
   this.planningDialog = false ;
 }

 upload() {
  this.progress = 0;
  this.currentFile = this.selectedFiles.item(0);
  console.log("current file",this.currentFile);
  this.session.programme=this.currentFile.name ;
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
    this.session.programme = this.currentFile.name ;
  this.selectedFiles = undefined;
}

selectFile(event) {
  this.selectedFiles = event.target.files;
}

updateSession(){
  if(this.imgURL)
  this.upload1()
  console.log("NIIv",this.session.nivDifficulte)
  console.log("before update",this.session)
  this.sessionForamtionService.updateSession(this.session).subscribe(
    data =>{
      console.log("updated perfectly",data)
      this.messageService.add({severity:'success', summary: 'Données Modifié', detail: " session est mise à jour", life: 3000});
      this.getbyIDSession()
      
    },
    error => {
      console.log("erreur", error.error.message)
    }
  )
}

updatePhoto(){
  if(this.imgURL){
  this.upload1()
  this.session.photoSession = this.file.name;
  this.sessionForamtionService.updateSession(this.session).subscribe(
    data =>{
      this.messageService.add({severity:'success', summary: 'Image Modifié', detail: " session est mise à jour", life: 3000});
      this.getbyIDSession()
      this.imgURL=null
    },
    error => {
      console.log("erreur", error.error.message)
    }
  )}
}
openListCandidat(){
  console.log("aaa")
  this.ref = this.dialogService.open(ListCandidatsDialogComponent, {
    header: 'Liste des candidats',
    width: '70%',
    contentStyle: {"max-height": "500px", "overflow": "auto"},
    baseZIndex: 10000
}); 


}
ngOnDestroy() {
  if (this.ref) {
      this.ref.close();
  }
}

onUpload(event){
  if (event.target.files.length > 0)
  {
    this.selectedFile = event.target.files;
   this.file = event.target.files[0];
    //this.userFile = file;
   // this.f['profile'].setValue(file);

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
  }
  console.log("file name ", this.file.name)
  }
this.namePhoto=this.file.name ;
}

upload1() {
 // this.progress = 0;
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
     // this.progress = 0;
      console.log(err);
      if(err.error.message.includes("constraint"))
      this.message =" Cette image existe deja"
      else
      this.message = ' Un probleme est survenue';
      this.currentFile = undefined;
    });
  this.selectedFile = undefined;
}
}
