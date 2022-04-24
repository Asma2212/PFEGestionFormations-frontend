import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Etablissement } from 'app/models/Etablissement';
import { Formateur } from 'app/models/Formateur';
import { genreModel } from 'app/models/Genre';
import { Egenre } from 'app/models/GenreEnum';
import { Specialite } from 'app/models/Specialite';
import { FormateurService } from 'app/services/formateur.service';
import { SpecialiteService } from 'app/services/specialite.service';
import { ConfirmationService, MenuItem, MessageService, SelectItem, SelectItemGroup } from 'primeng/api';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadFileService } from 'app/services/upload-file.service';

@Component({
  selector: 'app-liste-formateurs',
  templateUrl: './liste-formateurs.component.html',
  styleUrls: ['./liste-formateurs.component.css']
})
export class ListeFormateursComponent implements OnInit {
  autre : boolean = false;
  etab:Etablissement ;
  selectedEtablissement: Etablissement;
  listEtablissement : Etablissement[];
  dateN : Date;
  genre : genreModel;
  femme : string ;
  homme : string ;
  items: MenuItem[];
  formateurs: Formateur[];
  formateur : Formateur ;
  specialites : Specialite[];
  groupedSpecialites: SelectItemGroup[];
  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;

  formateurDialog: boolean;
  submitted: boolean;
  uploadedFiles: any[] = [];
  file: File = null;
  fileCV: File = null;
  public imagePath;
  imgURL: any;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  selectedFiles1: FileList;
  currentFile1: File;
  progress1 = 0;
  message1 = '';
  fileInfos: Observable<any>;
//private formateurService: FormateurService
  constructor(private formateurService : FormateurService ,private uploadService: UploadFileService ,private specialiteService : SpecialiteService ,private router: Router, private confirmationService : ConfirmationService , private messageService : MessageService) { }

  ngOnInit() {
    this.fileInfos = this.uploadService.getFiles();
    this.listEtablissement = [
      {code : "IR.png",name:"ISET Rades"},
      {code:"IN.jpg",name : "ISET Nabeul"},
      {code:"IK.jfif",name:"ISET Klibia"},
      {code:"ESP.jpg",name:"Esprit"},
      {code:"p.png",name:"Autre"}
    ]

    this.items = [
      {label: 'Modifier', icon: 'pi pi-user-edit',routerLink: ['/formateurs/ajouter'] //entrer l id du formateur à modifier
      },
      {label: 'Ajouter', icon: 'pi pi-user-plus', routerLink: ['/formateurs/ajouter']
      },
      {label: 'Refresh', icon: 'pi pi-refresh',routerLink: ['/formateurs/list']},
      {separator: true},
      {label: 'Parametre', icon: 'pi pi-cog', routerLink: ['/setup']}
  ];
  this.groupedSpecialites = [
    {
        label: 'Developpement web', value: 'angular.png', 
        items: [
            {label: 'Angular', value: 'Angular'},
            {label: 'React', value: 'React'},
            {label: 'Spring Boot', value: 'Spring Boot'},
            {label: 'Node JS', value: 'Node JS'}
        ]
    },
    {
      label: 'Developpement mobile', value: 'favicon.png', 
      items: [
          {label: 'Android', value: 'Android'},
          {label: 'Flutter', value: 'Flutter'},
          {label: 'IOS', value: 'IOS'},
          {label: 'Xamarin', value: 'Xamarin'}
      ]
  }
];
    
     /*    this.specialiteService.getAllSpecialite().toPromise().then( data => {
        this.specialites = data ;
          console.log("everthing is okay geet categorie",data)
        });*/
        this.formateurService.getAllFormateurs().toPromise().then( data => {
          this.formateurs = data ;
            console.log("everthing is okay geet",data)
          });
          this.specialiteService.getAllSpecialites().toPromise().then( data =>{
            this.specialites = data ; 
            console.log("speciaalie :",data) });
           
  }
testImage(t : string){
   return t.includes("image") ;
}
  upload() {
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    console.log("current file",this.currentFile);
    this.formateur.cv=this.currentFile.name ;
    this.uploadService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });
      this.formateur.cv = this.currentFile.name ;
    this.selectedFiles = undefined;
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
        this.message1 = 'Could not upload the file!';
        this.currentFile1 = undefined;
      });
    this.selectedFiles1 = undefined;
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  selectEtab(){
    if((this.selectedEtablissement)&&(this.selectedEtablissement[0].name == "Autre")){
      this.autre = true ;
    }
  }
 ajouter(){
    this.router.navigateByUrl('/formateurs/ajouter');
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
    this.formateur.photo=this.file.name ;
  }
  onSortChange(event) {
      let value = event.value;

      if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
      }
      else {
          this.sortOrder = 1;
          this.sortField = value;
      }
  }
  editFormateur(formateur: Formateur) {
    this.formateur = {...formateur};
    //this.imgURL = formateur.photo ;
    this.formateurDialog = true;
    if(formateur.genre.name == "FEMME")
    this.femme = "Femme" ;
    else
    this.homme = "Homme"
   // this.setGenre();

}

deleteFormateur(formateur: Formateur) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ?',//' + formateur.name + 'Are you sure you want to delete' + formateur.name + ' ?'
        header: 'Confirm',
        icon: 'pi pi-exclamateur-triangle',
        accept: () => {
            this.formateurs = this.formateurs.filter(val => val.id !== formateur.id);
            console.log(formateur.id);
            this.formateurService.deleteFormateur(formateur.id).subscribe( data => {
              console.log("data Formateur deleted",data)
            });
            this.formateur = null;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Formateur Deleted', life: 3000});
            window.location.reload();
        }
    });
    
} 

saveFormateur() {
  console.log(typeof(this.formateur.username.toString()));
  console.log(this.femme);
  this.submitted = true;
  //this.formateur.photo=this.file.name ;

  if(this.femme){
   // this.genre.id = 2 ;
  // this.genre.name = this.egf;
   console.log("geenre",Egenre.FEMME);
    this.formateur.genre = {id : 2 , name : Egenre.FEMME} ;
 }
 if(this.homme){
   //this.genre.id = 1 ; 
   //this.genre.name = this.egh ;
   this.formateur.genre = null ;
} 
  if (this.formateur.id) {
    //this.genre = this.formateur.genre ;
    console.log("before update",this.formateur);
    this.formateurService.updateFormateur(this.formateur).subscribe( data => {
      console.log("data update Formateur",data);
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'formateur Updated', life: 3000});
    window.location.reload();
    });
    
}
else {
   // this.formateurs.push(this.formateur);
 /*   this.formateurService.saveFormateurData(formData).subscribe( data => {
    
      console.log("data type",data.type)
      console.log("data get",data.get)
      console.log("data",data)
    }); */
    if(this.selectedEtablissement[0].name!="Autre")
    this.formateur.etablissement=this.selectedEtablissement[0].name ;
    console.log("heeedhyyy",this.formateur)
    this.formateurService.saveFormateur(this.formateur).subscribe( data => {
      console.log("data save Formateur",data);
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'formateur ajouter', life: 3000});
      window.location.reload();
    },
    error =>
   {
  console.log("exception occured");});
}

}

counter(i: number) {
  return new Array(i);
}
openNew(formateur: Formateur) {
  this.formateur = {...formateur};
  //this.imgURL = formateur.photo ;
  this.formateurDialog = true;

}
hideDialog() {
  this.formateurDialog = false;
  this.formateur = null ;
  this.submitted = false;
  this.imgURL = null ;
  this.autre = false ;
  this.uploadedFiles = [];
  this.file  = null;
  this.fileCV  = null;
  this.progress = 0;
  this.message = '';
  this.selectedFiles1 = null;
  this.currentFile1=null;
  this.selectedFiles = null;
  this.currentFile=null;
  this.progress1 = 0;
  this.message1 = '';

}

/*setGenre(){

 if(this.formateur.genre.id == 2)
 {
   this.femme = true ;
   console.log(this.formateur.genre)
 }
}*/
}
