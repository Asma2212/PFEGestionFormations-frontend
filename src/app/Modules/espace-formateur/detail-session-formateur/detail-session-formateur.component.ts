import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionFormation } from 'app/models/SessionFormation';
import { SessionService } from 'app/services/session.service';
import { SessionFormationService } from 'app/services/SessionFormation.service';
import { UploadFileService } from 'app/services/upload-file.service';
import { map } from 'rxjs/operators';
import { error } from 'console';
import { Observable } from 'rxjs';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { ConfirmationService } from 'primeng/api';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-detail-session-formateur',
  templateUrl: './detail-session-formateur.component.html',
  styleUrls: ['./detail-session-formateur.component.scss']
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

  constructor(private route: ActivatedRoute,private sessionService : SessionService,private sessionForamtionService : SessionFormationService,private uploadService : UploadFileService,private confirmationService:ConfirmationService) { }

  ngOnInit(): void {
    this.planningDialog = false ;
    this.getbyIDSession()
    this.fileInfos = this.uploadService.getFiles();
  }


  getbyIDSession() {
    this.id = this.route.snapshot.params['id']
    this.sessionService.getSession(this.id).toPromise().then(data => {
      console.log("Message", data)
      this.session = data


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
   this.sessionForamtionService.updateSession(this.session).toPromise().then(
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
    message: 'etes-Vous sur vous voulez supprimer' + keyPlanning + '?',
    header: 'Confirmer',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      Object.keys(this.session.planning).forEach(key => {
        if(keyPlanning == key) delete this.session.planning[key];
     });
      console.log("base",this.session.planning,"mnaa",this.plan)
       this.sessionForamtionService.updateSession(this.session).toPromise().then(
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
        this.message = event.body.message;
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
}
