import { Component, OnInit } from '@angular/core';
import { Formateur } from 'app/models/Formateur';
import { FormateurService } from 'app/services/formateur.service';
import { UploadFileService } from 'app/services/upload-file.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-formateurs-dialog',
  templateUrl: './formateurs-dialog.component.html',
  styleUrls: ['./formateurs-dialog.component.scss']
})
  export class FormateursDialogComponent implements OnInit  {
    fileInfos: Observable<any>;
    formateurs: Formateur[];
    selectedFormateurs : Formateur[];

    constructor(private uploadService : UploadFileService,private formateurService: FormateurService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

    ngOnInit() {
      this.fileInfos = this.uploadService.getFiles();
        this.formateurService.getAllFormateurs().subscribe(data => this.formateurs = data);
        this.selectedFormateurs=this.config.data ;
    }

    selectFormateur(formateurs: Formateur[]) {
      this.selectedFormateurs = formateurs ;
      console.log(formateurs)
        this.ref.close(formateurs);
    }
    testImage(t : string){
      return t.includes("image") ;
   }
}
