import { Component, OnInit } from '@angular/core';
import { Formateur } from 'app/models/Formateur';
import { Specialite } from 'app/models/Specialite';
import { FormateurService } from 'app/services/formateur.service';
import { SpecialiteService } from 'app/services/specialite.service';
import { UploadFileService } from 'app/services/upload-file.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gestion-specialite',
  templateUrl: './gestion-specialite.component.html',
  styleUrls: ['./gestion-specialite.component.scss']
})
export class GestionSpecialiteComponent implements OnInit {
  specialites : Specialite[];
  specialiteDialog : boolean = false ;
  selectedspecialites : Specialite[];
  sp : Specialite ;
  submitted : boolean = false ;

  constructor( public ref: DynamicDialogRef, public config: DynamicDialogConfig, private specialiteService : SpecialiteService, private messageService : MessageService,private confirmationService : ConfirmationService) { }

  ngOnInit() {
     this.getSpec()
  }
  getSpec(){
    this.specialiteService.getAllSpecialites().subscribe(data =>
      this.specialites = data)
  }
  openspecialite(){
    this.specialiteDialog = true ;
    this.sp = {
    id : 0 ,
    titre :"",
    listFormateur : []
    }
            }
            savespecialite(){
              this.submitted = true
              if(this.sp.titre)
              this.specialiteService.saveSpecialite(this.sp).subscribe(data => {
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'specialite Ajouter', life: 3000});
                this.getSpec();
                this.specialiteDialog = false
              }
                )
            }
            hidespecialite(){
                this.specialiteDialog = false ;
                this.sp = {
                  id : 0 ,
                  titre :"",
                  listFormateur : []
                  }
            }
            
  editspecialite(spec : Specialite){
    this.specialiteDialog = true ;
    this.sp = spec
  }
  deletespecialite(spec : Specialite){
      this.confirmationService.confirm({
        acceptLabel:"supprimer",
        acceptButtonStyleClass:"p-button-danger",
        rejectLabel:"annuler",
        rejectButtonStyleClass:"p-button-info",
          message: 'Etes-vous sûr que vous voulez supprimer la specialité selectionnée ' + spec.titre + '?',
          header: 'Confirmer',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.specialiteService.deleteSpecialite(spec.id).subscribe( data => {
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'specialite Supprimer', life: 3000});
                this.getSpec()
              }, err => {
                if(err.error.message.includes("constraint"))
                this.messageService.add({severity:'error', summary: 'suppression impossible', detail: "cette specialite appartient à une formateur", life: 3000});
                       });
              this.sp = null;

          }
      });
  
  }
  deleteSelectedspecialites(){
    this.confirmationService.confirm({
      acceptLabel:"supprimer",
      acceptButtonStyleClass:"p-button-danger",
      rejectLabel:"annuler",
      rejectButtonStyleClass:"p-button-info",
        message: 'Etes-vous sûr que vous voulez supprimer les specialites selectionnées ?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.specialiteService.deleteAllSpecialites(this.selectedspecialites).subscribe(
            res => {
            this.messageService.add({severity:'success', summary: 'Succés', detail: 'specialite Supprimées', life: 3000});
            console.log('specialites Supprimer');
            this.getSpec()
            }, err => {
              if(err.error.message.includes("constraint"))
                this.messageService.add({severity:'error', summary: 'suppression impossible', detail: "specialite(s) appartient à une formation", life: 3000});
                      
              
                      }
                  );
          this.selectedspecialites = null;
          
      }
  });
  }

}

