import { HttpParams } from '@angular/common/http';
import { collectExternalReferences, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Categorie } from 'app/models/Categorie';
import { Formation} from 'app/models/Formation';
import { CategorieService } from 'app/services/categorie.service';
import { FormationService } from 'app/services/formation.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-liste-formations',
  templateUrl: './liste-formations.component.html',
  styles: [`
        :host ::ng-deep .p-dialog .formation-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
  styleUrls: ['./liste-formations.component.css']
})
export class ListeFormationsComponent implements OnInit {

  detailForm : string ;
    displayReadMore : boolean ;
    categories : Categorie[];
    selectedCategorie :  Categorie ;
   formationDialog: boolean;

  formations: Formation[];

  formation: Formation;

  selectedFormations: Formation[];

  submitted: boolean;
  uploadedFiles: any[] = [];
  file: File = null;
  public imagePath;
  imgURL: any;
  public message: string;
  categorie : Categorie ;

  //statuses: any[]; , private messageService: MessageService, private confirmationService: ConfirmationService

  constructor(private formationService: FormationService,private categorieService : CategorieService,private confirmationService : ConfirmationService , private messageService : MessageService ) { }
 
  ngOnInit() {
  /* this.categories = [{
        idCategorie : 1,
        titre : "Angular",
        description : "dev web front end" ,
        listFormations : null},{
            idCategorie : 2,
            titre : "Spring Boot",
            description : "dev web back end" ,
            listFormations : null}
    ];*/
   /* this.categorie = {
        idCategorie : 1,
        titre : "node js",
        description : "dev web back end" ,
        listFormations : null}

    this.categorieService.saveCategorie(this.categorie).subscribe( data => {
              
        console.log(" save cat data",data)
      });*/
    
    
      this.categorieService.getAllCategories().toPromise().then( data => {
        this.categories = data ;
          console.log("everthing is okay geet categorie",data)
        });
      this.formationService.getAllFormations().toPromise().then( data => {
              this.formations = data ;
                console.log("everthing is okay geet",data)
              });


  }

  openNew() {
      this.formationDialog = true;
      this.formation = {  idFormation:  0,
        titre : "",
        charge_horaire : "",
        details : "" ,
        image : "" ,
        listCategories : null };
      this.submitted = false;  
  }

  /*onUpload(event) {
    this.file = <File>event.target.files[0]
    console.log(this.file)
    

    //this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}*/
onUpload(event){
    this.file = <File>event.target.files[0]
    console.log(this.file)
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
      console.log("imaage",this.imgURL) 
    }
    this.formation.image=this.file.name ;
  }

  deleteSelectedFormations() {
      this.confirmationService.confirm({
          message: 'vous etes sur vous voulez supprimer les formations selectionnées ?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.formations = this.formations.filter(val => !this.selectedFormations.includes(val));
              console.log(this.selectedFormations);
              this.formationService.deleteAllFormation(this.selectedFormations).subscribe(
                res => {
                console.log('Formations successfully deleted');
                }, err => {
                   console.log('Something went wrong during deleting formations');
                          }
                      );
              this.selectedFormations = null;
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Formations Deleted', life: 3000});
          }
      });
  }

  editFormation(formation: Formation) {
      this.formation = {...formation};
      this.imgURL = formation.image ;
      this.formationDialog = true;

  }

  deleteFormation(formation: Formation) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + formation.titre + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.formations = this.formations.filter(val => val.idFormation !== formation.idFormation);
              console.log(formation.idFormation);
              this.formationService.deleteFormation(formation.idFormation).subscribe( data => {
                console.log("data Formation deleted",data)
              });
              this.formation = null;
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Formation Deleted', life: 3000});
          }
      });
  }

  hideDialog() {
      this.formationDialog = false;
      this.submitted = false;
      this.imgURL = null ;
  }

  saveFormation() {
      this.submitted = true;
      if(this.file)
      this.formation.image=this.file.name ;
      console.log("heeeeyy",this.formation,this.formation.titre,this.formation.listCategories,this.formation.image);
     const formData = new  FormData();
    /*  const params = new HttpParams()
      .set('file', this.imgURL)
      .set('Titre', this.formation.titre.toString())
      .set('charge_horraire',this.formation.chargeHorraire.toString())
      .set('details',this.formation.detail.toString())
      .set('listCategories',JSON.stringify(this.formation.listCategories));*/
      formData.append('file',this.file);
      formData.append('Titre',this.formation.titre.toString());
      formData.append('charge_horraire',this.formation.charge_horaire.toString());
      formData.append('details',this.formation.details.toString());
      formData.append('listCategories',JSON.stringify(this.formation.listCategories)); 
    
      if (this.formation.titre.trim()) {
          if (this.formation.idFormation) {
              this.formations[this.findIndexById(this.formation.idFormation.toString())] = this.formation;
              this.formationService.updateFormation(this.formation).subscribe( data => {
                console.log("data update Formation",data)
              });
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'formation Updated', life: 3000});
          }
          else {
              this.formations.push(this.formation);
           /*   this.formationService.saveFormationData(formData).subscribe( data => {
              
                console.log("data type",data.type)
                console.log("data get",data.get)
                console.log("data",data)
              }); */
              console.log("heeedhyyy",this.formation)
              this.formationService.saveFormation(this.formation).subscribe( data => {
                console.log("data save Formation",data)
              });
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'formation ajouter', life: 3000});
          }

          this.formations = [...this.formations];
          this.formationDialog = false;
          this.imgURL = false ;
          this.formation = null;
      }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.formations.length; i++) {
          if (this.formations[i].idFormation.toString() === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  readMoreDialog(detailForm : string) {
    this.displayReadMore = true;
    this.detailForm = detailForm ;
}
/*
  createId(): string {
      let id = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for ( var i = 0; i < 5; i++ ) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }
  */
}
