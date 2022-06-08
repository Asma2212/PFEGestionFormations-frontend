import { Component, OnInit } from '@angular/core';
import { Categorie } from 'app/models/Categorie';
import { Formateur } from 'app/models/Formateur';
import { CategorieService } from 'app/services/categorie.service';
import { FormateurService } from 'app/services/formateur.service';
import { UploadFileService } from 'app/services/upload-file.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gestion-categorie',
  templateUrl: './gestion-categorie.component.html',
  styleUrls: ['./gestion-categorie.component.scss']
})
export class GestionCategorieComponent implements OnInit {
  fileInfos: Observable<any>;
  categories : Categorie[];
  categorieDialog : boolean = false ;
  selectedCategories : Categorie[];
  c : Categorie ;
  submitted : boolean = false ;

  constructor( public ref: DynamicDialogRef, public config: DynamicDialogConfig, private categorieService : CategorieService, private messageService : MessageService,private confirmationService : ConfirmationService) { }

  ngOnInit() {
      this.categorieService.getAllCategories().subscribe(data =>
        this.categories = data)
  }
  openCategorie(){
    this.categorieDialog = true ;
    this.c = {
    id : 0 ,
    titre :"",
    Description : "",
    ListFormations : []
    }
            }
            saveCategorie(cat : Categorie){
              this.submitted = true
              if(cat.titre)
              this.categorieService.saveCategorie(cat).subscribe(data => {
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'categorie Ajouter', life: 3000});
                this.categorieService.getAllCategories().subscribe( data => {
                  this.categories = data ;
                    console.log("everthing is okay geet categorie222",data)
                  });
                this.categorieDialog = false
              }
                )
            }
            hideCategorie(){
                this.categorieDialog = false ;
                this.c = {
                  id : 0 ,
                  titre :"",
                  Description : "",
                  ListFormations : []
                  }
            }
            
  editCategorie(cat : Categorie){
    this.categorieDialog = true ;
    this.c = cat
  }
  deleteCategorie(cat : Categorie){
      this.confirmationService.confirm({
        acceptLabel:"supprimer",
        acceptButtonStyleClass:"p-button-danger",
        rejectLabel:"annuler",
        rejectButtonStyleClass:"p-button-info",
          message: 'Etes-vous sûr que vous voulez supprimer ' + cat.titre + '?',
          header: 'Confirmer',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.categorieService.deleteCategorie(cat.id).subscribe( data => {
                console.log("data Formation Supprimer",data);
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Formation Supprimer', life: 3000});
                this.ngOnInit()
              }, err => {
                if(err.error.message.includes("constraint"))
                this.messageService.add({severity:'error', summary: 'suppression impossible', detail: "cette categorie appartient à une formation", life: 3000});
                       });
              this.c = null;

          }
      });
  
  }
  deleteSelectedCategories(){
    this.confirmationService.confirm({
      acceptLabel:"Supprimer",
      acceptButtonStyleClass:"p-button-danger",
      rejectLabel:"Annuler",
      rejectButtonStyleClass:"p-button-info",
      message: 'etes-vous sur vous voulez supprimer les categories selectionnées ?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.categorieService.deleteAllCategories(this.selectedCategories).subscribe(
            res => {
            this.messageService.add({severity:'success', summary: 'Succés', detail: 'Categries Supprimées', life: 3000});
            console.log('categories Supprimer');
            this.ngOnInit()
            }, err => {
              if(err.error.message.includes("constraint"))
                this.messageService.add({severity:'error', summary: 'suppression impossible', detail: "categorie(s) appartient à une formation", life: 3000});
                      
              
                      }
                  );
          this.selectedCategories = null;
          
      }
  });
  }

}
