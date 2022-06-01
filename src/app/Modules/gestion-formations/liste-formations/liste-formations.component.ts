import { HttpEventType, HttpParams, HttpResponse } from '@angular/common/http';
import { collectExternalReferences, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Categorie } from 'app/models/Categorie';
import { Formation} from 'app/models/Formation';
import { CategorieService } from 'app/services/categorie.service';
import { FormationService } from 'app/services/formation.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import * as html2pdf from 'html2pdf.js' ;

import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import { Observable } from 'rxjs';
import { UploadFileService } from 'app/services/upload-file.service';
import { GestionCandidatComponent } from 'app/Modules/gestion-candidats/gestion-candidat/gestion-candidat.component';
import { GestionCategorieComponent } from '../gestion-categorie/gestion-categorie.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
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
      providers: [DialogService],
  styleUrls: ['./liste-formations.component.css']
})
export class ListeFormationsComponent implements OnInit {
    uploadedFiles: any[] = [];
    fileEntry :FileSystemFileEntry | undefined ;

    detailForm : String ;
    titreDetail : String ;
    displayReadMore : boolean ;
    categories : Categorie[];
    selectedCategorie :  Categorie ;
   formationDialog: boolean;
   categorieDialog : boolean = false ;

  formations: Formation[];

  formation: Formation;
  formationDetail: Formation;
  selectedFormations: Formation[];

  submitted: boolean;
  file: File = null;
  public imagePath;
  imgURL: any;
  public message: string;
  categorie : Categorie ;
  c : Categorie ;
    fileName = 'ExcelSheet.xlsx';
    selectedFiles1: FileList;
    currentFile1: File;
    progress1 = 0;
    message1 = '';
    fileInfos: Observable<any>;
    ref: DynamicDialogRef;

  //statuses: any[]; , private messageService: MessageService, private confirmationService: ConfirmationService

  constructor(private formationService: FormationService,private uploadService : UploadFileService, private categorieService : CategorieService,private confirmationService : ConfirmationService , private messageService : MessageService,private dialogService: DialogService ) { }

  ngOnInit() {
      this.fileInfos = this.uploadService.getFiles();
      this.categorieService.getAllCategories().subscribe( data => {
        this.categories = data ;
          console.log("everthing is okay geet categorie",data)
        });
      this.formationService.getAllFormations().subscribe( data => {
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
        listCategories : null ,
      sessionFormations : null};
      this.submitted = false;

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
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Formations Supprimer', life: 3000});
                console.log('Formations successfully Supprimer');
                window.location.reload();
                }, err => {
                   console.log('Something went wrong during deleting formations');
                          }
                      );
              this.selectedFormations = null;

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
        acceptLabel:"supprimer",
        acceptButtonStyleClass:"p-button-info",
        rejectLabel:"annuler",
        rejectButtonStyleClass:"p-button-danger",
          message: 'Etes-vous sûr que vous voulez supprimer ' + formation.titre + '?',
          header: 'Confirmer',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.formations = this.formations.filter(val => val.idFormation !== formation.idFormation);
              console.log(formation.idFormation);
              this.formationService.deleteFormation(formation.idFormation).subscribe( data => {
                console.log("data Formation Supprimer",data);
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Formation Supprimer', life: 3000});
                window.location.reload();
              });
              this.formation = null;

          }
      });
  }
  upload1() {
    this.progress1 = 0;
    this.currentFile1 = this.selectedFiles1.item(0);
    console.log("current file",this.currentFile1);
    this.uploadService.upload(this.currentFile1).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress1 = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message1 = event.body.message;
        }
      },
      err => {
        this.progress1 = 0;
        if(err.error.message.includes("constraint"))
        this.message1 =" Cette image existe deja"
        else
        this.message1 = ' Un probleme est survenue';
        this.currentFile1 = undefined;
      });
    this.selectedFiles1 = undefined;
  }
  hideDialog() {
      this.formationDialog = false;
      this.submitted = false;
      this.imgURL = null ;
      this.uploadedFiles = [];
      this.file  = null;
      this.selectedFiles1 = null;
      this.currentFile1=null;
      this.progress1 = 0;
      this.message1 = '';
  }
  testImage(t : string){
    return t.includes("image") ;
 }
  onUpload(event){
    this.selectedFiles1 = event.target.files;
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

  }

  saveFormation() {
      this.submitted = true;
      if(this.file)
      this.formation.image=this.file.name ;
      console.log("heeeeyy",this.formation,this.formation.titre,this.formation.listCategories,this.formation.image);
     const formData = new  FormData();

      if ((this.formation.titre.trim())&&(this.formation.charge_horaire.trim())&&(this.formation.listCategories)) {
          if (this.formation.idFormation) {
              this.formations[this.findIndexById(this.formation.idFormation.toString())] = this.formation;
              this.formationService.updateFormation(this.formation).subscribe( data => {
                console.log("data update Formation",data)
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'formation Updated', life: 3000});
                window.location.reload();
              });

          }
          else {
            this.formation.image=this.file.name ;
              this.formations.push(this.formation);
           /*   this.formationService.saveFormationData(formData).subscribe( data => {

                console.log("data type",data.type)
                console.log("data get",data.get)
                console.log("data",data)
              }); */
              console.log("heeedhyyy",this.formation)

              this.formationService.saveFormation(this.formation).subscribe( data => {
                console.log("data save Formation",data)
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'formation ajouter', life: 3000});
                window.location.reload();
              });

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

  readMoreDialog(formation : Formation) {
    this.displayReadMore = true;
    this.titreDetail = formation.titre.toString();
    this.detailForm = formation.details.toString();
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
    exportexcel(): void {
        /* pass here the table id */
        const element = document.getElementById('excel-table');
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, this.fileName);}

    exportoPdf (): void{
    const options={
        filename: 'Formationfile.pdf',
    image: { type: 'jpeg' },
        html2canvas: {},
        jsPDF: {orientation: 'landscape'}
    }
    const  content = document.getElementById('excel-table') ;
    html2pdf().from(content).set(options).save();


}
    /******/
    /************************/
    public files: NgxFileDropEntry[] = [];

    public dropped(files: NgxFileDropEntry[]) {
        this.files = files;
        for (const droppedFile of files) {

            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                this.fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                this.fileEntry.file((file: File) => {

                    // Here you can access the real file
                    console.log(droppedFile.relativePath, file);

                    /**
                     // You could upload it like this:
                     const formData = new FormData()
                     formData.append('logo', file, relativePath)

                     // Headers
                     const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

                     this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
                     .subscribe(data => {
            // Sanitized logo returned from backend
          })
                     **/

                });
            } else {
                // It was a directory (empty directories are added, otherwise only files)
                const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
                console.log(droppedFile.relativePath, fileEntry);
            }
        }
    }

    public fileOver(event){
        console.log(event);
    }

    public fileLeave(event){
        console.log(event);
    }
    uploadVideo() {

        if (this.fileEntry !== undefined) {
            console.log(this.fileEntry);
            this.fileEntry.file(  file => {
                this.categorieService.uploadVideo(file).subscribe(data =>{
                    console.log("Video uploaded succesfuly !")

                })


            })


        }}

        openCategorie(){
this.categorieDialog = true ;
this.c = {
id : 0 ,
titre :"",
Description : "",
ListFormations : null
}
        }
        saveCategorie(){
          this.categorieService.saveCategorie(this.c).subscribe(data => {
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
              ListFormations : null
              }
        }

  gestionCategorie() {
    console.log("aaa")
    this.ref = this.dialogService.open(GestionCategorieComponent, {
      header: 'liste des categories',
      width: '40%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
  });
  }
  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
}
}
