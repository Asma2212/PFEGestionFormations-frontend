import { Component, OnInit } from '@angular/core';
import { Classe } from 'app/models/Classe';
import { Department } from 'app/models/Departement';
import { ClasseService } from 'app/services/classe.service';
import { DepartementService } from 'app/services/departement.service';

import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-gestion-classe',
  templateUrl: './gestion-classe.component.html',
  styleUrls: ['./gestion-classe.component.scss']
})
export class GestionClasseComponent implements OnInit {
  classes : Classe[] = [];
  classesTest : Classe[] = [];
  classeDialog : boolean = false ;
  selectedClasses : Classe[];
  depList : Department[];
  classe : Classe ;
  cl : Classe ;
  dep : string;
  d:Department ;
  listD:Department[] = [] ;
  submitted : boolean = false ;

  constructor( public ref: DynamicDialogRef, public config: DynamicDialogConfig, private classeService : ClasseService, private messageService : MessageService,private confirmationService : ConfirmationService,private departementService : DepartementService) { }

  ngOnInit() {
      this.getAllClasse()
      this.getAllDep()
  }
  getAllClasse(){
    this.classeService.getAllClasses().subscribe(data =>{
this.classes = data
/**this.classesTest.forEach(c => {
        console.log("claassee",c)
        this.cl = c
        this.cl.candidat = [] ;
        this.departementService.getDepartementByClass(c.id).subscribe( data => {
          console.log("deeeep",data)
          this.d=data
          this.cl.department = {
            id : this.d.id ,
            name : this.d.name,
            classes : [],
            candidat : []
          }
          
         })
         this.classes.push(this.cl);
      }); */
    }
      )
  }
  getAllDep(){
    this.departementService.getAllDepartements().subscribe( data => {
      this.depList = data
     })
  }

  openClasse(){
    this.classeDialog= true ;
    this.classe = {
    id : 0 ,
    name : "",
    department : null ,
    candidat : []
    }
            }
            saveClasse(){
              this.submitted = true
              console.log("saved classe",this.classe)
              if(this.classe.name && this.d)
              {
                if(this.classe.id != 0 ){
                  
                  this.classeService.updateClasse(this.classe,this.d.id).subscribe(data => {
                    this.messageService.add({severity:'success', summary: 'Succés', detail: 'classe ajouté', life: 3000});
                    this.getAllClasse()
                    
                  }
    
                    )}
                else{
              this.classeService.saveClasse(this.classe,this.d.id).subscribe(data => {
                this.messageService.add({severity:'success', summary: 'Succés', detail: 'classe ajouté', life: 3000});
                this.getAllClasse()
                
              }

                )}
                this.classe = {
                  id : 0 ,
                  name : "",
                  department : null ,
                  candidat : []
                  }
                  this.d = null ;
                this.classeDialog = false}
            }
            hideClasse(){
                this.classeDialog= false ;
                this.classe = {
                  id : 0 ,
                  name : "",
                  department : null ,
                  candidat : []
                  }

            }
            
  editClasse(c : Classe){
    this.departementService.getDepartementByClass(c.id).subscribe(data =>{
      this.d = data 
      this.listD.push(this.d)
    })
    this.classeDialog = true ;
    this.classe = c
  }
  deleteClasse(d : Classe){
      this.confirmationService.confirm({
          message: 'vous etes sur vous voulez supprimer le classe ' + d.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.classeService.deleteClasse(d.id).subscribe( 
                res => {
                  this.messageService.add({severity:'success', summary: 'Succés', detail: 'classe Supprimées', life: 3000});
                  console.log('classe Supprimer');
                  this.getAllClasse()
                  }, err => {
                    if(err.error.message.includes("constraint"))
                      this.messageService.add({severity:'error', summary: 'suppression impossible', detail: "classe appartient à une formation", life: 3000});
                            
                    
                            }
                        );
              this.classe = null;

          }
      });
  
  }
  deleteSelectedClasses(){
    this.confirmationService.confirm({
      message: 'vous etes sur vous voulez supprimer les classes selectionnées ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.classeService.deleteAllClasses(this.selectedClasses).subscribe(
            res => {
            this.messageService.add({severity:'success', summary: 'Succés', detail: 'classe Supprimées', life: 3000});
            console.log('classe Supprimer');
            this.getAllClasse()
            }, err => {
              if(err.error.message.includes("constraint"))
                this.messageService.add({severity:'error', summary: 'suppression impossible', detail: "classe(s) appartient à une formation", life: 3000});
                      
              
                      }
                  );
          this.selectedClasses = null;
          
      }
  });
  }

  departementSelected(dep){
    console.log("thhis")
    if(dep[0]){
    this.d = dep[0];
    console.log("hhheeey",this.d);
   // this.depSelected = true ;
   // this.listClass = dep[0].classes ;
  // this.classe.department = this.d;
  }}

}

