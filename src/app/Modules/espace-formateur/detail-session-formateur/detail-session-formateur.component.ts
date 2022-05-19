import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionFormation } from 'app/models/SessionFormation';
import { SessionService } from 'app/services/session.service';
import { SessionFormationService } from 'app/services/SessionFormation.service';
import { UploadFileService } from 'app/services/upload-file.service';
import { map } from 'rxjs/operators';
import { error } from 'console';
import { Observable } from 'rxjs';

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
titre : string ;
description : string ;
plan : Map<string,string>  ;


  constructor(private route: ActivatedRoute,private sessionService : SessionService,private sessionForamtionService : SessionFormationService,private uploadService : UploadFileService) { }

  ngOnInit(): void {
    this.planningDialog = false ;
    this.id = this.route.snapshot.params['id']
    this.getbyIDSession(this.id)
    this.fileInfos = this.uploadService.getFiles();
  }


  getbyIDSession(id: number) {
    this.sessionService.getSession(id).toPromise().then(data => {
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
   this.plan = this.session.planning ;
   console.log("base",this.session.planning,"mnaa",this.plan)
  this.plan= this.plan.set(this.titre,this.description);
this.session.planning = this.plan ;
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
 hidePlanning(){
   this.titre = ""
   this.description = ""
   this.planningDialog = false ;
 }
}
