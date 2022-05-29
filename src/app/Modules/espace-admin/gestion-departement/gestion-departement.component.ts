import { Component, OnInit } from '@angular/core';
import { Department } from 'app/models/Departement';
import { DepartementService } from 'app/services/departement.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-gestion-departement',
  templateUrl: './gestion-departement.component.html',
  styleUrls: ['./gestion-departement.component.scss']
})
export class GestionDepartementComponent implements OnInit {
  departements : Department[];
  departementDialog : boolean = false ;
  selectedDepartements : Department[];
  dep : Department ;

  constructor( public ref: DynamicDialogRef, public config: DynamicDialogConfig, private departementService : DepartementService, private messageService : MessageService,private confirmationService : ConfirmationService) { }

  ngOnInit() {
      this.getAllDep()
  }
  getAllDep(){
    this.departementService.getAllDepartements().subscribe(data =>
      this.departements = data)
  }
  openDepartement(){
    this.departementDialog= true ;
    this.dep = {
    id : 0 ,
    name :"",
    classes : [],
    candidat : []
    }
}
            saveDepartement(){
              this.departementService.saveDepartement(this.dep).subscribe(data => {
                this.messageService.add({severity:'success', summary: 'Succés', detail: 'Departement ajouté', life: 3000});
                this.getAllDep()
                this.departementDialog = false
              }
                )
            }
            hideDepartement(){
                this.departementDialog= false ;
                  this.dep = {
                    id : 0 ,
                    name :"",
                    classes : [],
                    candidat : []
                    }

            }
            
  editDepartement(d : Department){
    this.departementDialog = true ;
    this.dep = d
  }
  deleteDepartement(d : Department){
      this.confirmationService.confirm({
          message: 'vous etes sur vous voulez supprimer le departement ' + d.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.departementService.deleteDepartement(d.id).subscribe( 
                res => {
                  this.messageService.add({severity:'success', summary: 'Succés', detail: 'Departement Supprimées', life: 3000});
                  console.log('departement Supprimer');
                  this.getAllDep()
                  }, err => {
                    if(err.error.message.includes("constraint"))
                      this.messageService.add({severity:'error', summary: 'suppression impossible', detail: "departement appartient à une formation", life: 3000});
                            
                    
                            }
                        );
              this.dep = null;

          }
      });
  
  }
  deleteSelectedDepartements(){
    this.confirmationService.confirm({
      message: 'vous etes sur vous voulez supprimer les departements selectionnées ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.departementService.deleteAllDepartements(this.selectedDepartements).subscribe(
            res => {
            this.messageService.add({severity:'success', summary: 'Succés', detail: 'Departement Supprimées', life: 3000});
            console.log('departement Supprimer');
            this.getAllDep()
            }, err => {
              if(err.error.message.includes("constraint"))
                this.messageService.add({severity:'error', summary: 'suppression impossible', detail: "departement(s) appartient à une formation", life: 3000});
                      
              
                      }
                  );
          this.selectedDepartements = null;
          
      }
  });
  }

}

