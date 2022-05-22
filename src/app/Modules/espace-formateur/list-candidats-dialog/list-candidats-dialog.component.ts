import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidat } from 'app/models/Candidat';
import { Formateur } from 'app/models/Formateur';
import { FormateurService } from 'app/services/formateur.service';
import { SessionService } from 'app/services/session.service';
import { SessionFormationService } from 'app/services/SessionFormation.service';
import { UploadFileService } from 'app/services/upload-file.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-candidats-dialog',
  templateUrl: './list-candidats-dialog.component.html',
  styleUrls: ['./list-candidats-dialog.component.scss']
})
export class ListCandidatsDialogComponent implements OnInit {
  fileInfos: Observable<any>;
    formateurs: Formateur[];
    candidats : Candidat[];
    selectedFormateurs : Formateur[];
    id :number ;

    constructor(private uploadService : UploadFileService,private formateurService: FormateurService, public ref: DynamicDialogRef, public config: DynamicDialogConfig,private sessionService : SessionService,private route: ActivatedRoute) { }


    ngOnInit() {
      this.id = this.route.snapshot.params['id']
      this.sessionService.getSession(this.id).toPromise().then(data => {
        console.log("Message", data)
        this.candidats = data.listeCandidat ;
  
  
      }, error => {
        console.log(error.error.message)
      })
      this.fileInfos = this.uploadService.getFiles();
    }

    selectFormateur(candidats : Candidat[]) {
        this.ref.close(candidats);
    }
    testImage(t : string){
      return t.includes("image") ;
   }

}
