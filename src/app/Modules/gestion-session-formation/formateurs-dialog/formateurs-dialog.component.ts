import { Component, OnInit } from '@angular/core';
import { Formateur } from 'app/models/Formateur';
import { FormateurService } from 'app/services/formateur.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-formateurs-dialog',
  templateUrl: './formateurs-dialog.component.html',
  styleUrls: ['./formateurs-dialog.component.scss']
})
  export class FormateursDialogComponent implements OnInit  {

    formateurs: Formateur[];
    selectedFormateurs : Formateur[];

    constructor(private formateurService: FormateurService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

    ngOnInit() {
        this.formateurService.getAllFormateurs().toPromise().then(data => this.formateurs = data);
        this.selectedFormateurs=this.config.data ;
    }

    selectFormateur(formateurs: Formateur[]) {
      this.selectedFormateurs = formateurs ;
      console.log(formateurs)
        this.ref.close(formateurs);
    }
}
