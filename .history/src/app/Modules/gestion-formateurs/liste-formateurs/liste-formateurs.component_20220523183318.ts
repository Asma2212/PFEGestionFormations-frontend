import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { throwIfEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-liste-formateurs',
  templateUrl: './liste-formateurs.component.html',
  styleUrls: ['./liste-formateurs.component.css']
})
export class ListeFormateursComponent implements OnInit {
  spec : Specialite
  specialiteDialog : boolean = false
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
  f: Formateur[];
  formateurs1: Formateur[];
  formateursSp: Formateur[];
  formateur : Formateur = null;
  specialites : Specialite[];
  groupedSpecialites: SelectItemGroup[];
  sortOptions: SelectItem[];
  allFormateurs : Formateur[];
  filterValue : string
  filterEtab : Etablissement[] ;
filterSpecialite : Specialite[] ;
  sortOrder: number;

  sortField: string;

  formateurDialog: boolean;
  submitted: boolean;

  uploadedFiles: any[] = [];
  file: File = null;
  fileCV: File = null;
  public imagePath;
  imgURL: any = null;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  selectedFiles1: FileList;
  currentFile1: File;
  progress1 = 0;
  message1 = '';
  fileInfos: Observable<any>;
  cvFile: File ;


  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['firstName','lastName','lesSpecialite'];
  filterSelectObj = [];
  filterValues = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private formateurService : FormateurService ,private uploadService: UploadFileService ,private specialiteService : SpecialiteService ,private router: Router, private confirmationService : ConfirmationService , private messageService : MessageService) {   
  this.filterSelectObj = [
    {
      name: 'ID',
      columnProp: 'id',
      options: []
    }, {
      name: 'NAME',
      columnProp: 'name',
      options: []
    }, {
      name: 'USERNAME',
      columnProp: 'username',
      options: []
    }, {
      name: 'EMAIL',
      columnProp: 'email',       
      options: []
    }, {
      name: 'STATUS',
      columnProp: 'status',
      options: []
    }
  ] 
}
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
    
        this.formateurService.getAllFormateurs().subscribe( data => {
          this.formateurs = data ;
            console.log("everthing is okay geet",data)
            console.log("****",this.formateurs)
            this.allFormateurs = this.formateurs;
            this.dataSource.data = this.formateurs ;
            console.log(this.dataSource.data)
          });
        



this.getSpecialite()
            
           
  }
  getSpecialite(){
    this.specialiteService.getAllSpecialites().subscribe( data =>{
      this.specialites = data ; 
      console.log("speciaalie :",data) });
  }
 
  getFilterObject(fullObj, key) {
    const uniqChk = [];
    fullObj.filter((obj) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }


  resetFilters() {
    this.filterValues = {}
    this.filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    })
    this.dataSource.filter = "";
  }

  applyFilter(){
    this.formateurs=this.allFormateurs;
    if(this.filterValue){
      let filterValueLower = this.filterValue.toLowerCase();
      this.formateurs = this.formateurs.filter(f => f.firstName.toLowerCase().includes(filterValueLower) || f.lastName.toLowerCase().includes(this.filterValue));
    }
    if(this.filterEtab){
      let filterValueLower = this.filterEtab[0].name.toLowerCase();
      console.log("ff1",this.filterEtab[0].name);
    this.formateurs = this.formateurs.filter(f => f.etablissement.toLowerCase().includes(filterValueLower));
    }
    if(this.filterSpecialite){
      this.formateurs = this.formateurs.filter(f =>
        f.lesSpecialites.find(sp => sp.titre === this.filterSpecialite[0].titre)
        ); 
    }
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
        console.log(err);
        if(err.error.message.includes("constraint"))
        this.message =" Ce fichier existe deja"
        else
        this.message = ' Un probleme est survenue';
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
        console.log(err);
        if(err.error.message.includes("constraint"))
        this.message1 =" Cette image existe deja"
        else
        this.message1 = ' Un probleme est survenue';
        this.currentFile1 = undefined;
      });
    this.selectedFiles1 = undefined;
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.formateur.cv = this.selectedFiles[0].name ;
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
      console.log("imaage",this.imgURL.url) 
    }
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
              console.log("data Formateur Supprimer",data)
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Formateur Supprimer', life: 3000});
              window.location.reload();
            });
            this.formateur = null;

        }
    });
    
} 

saveFormateur() {
  var inputNom = (<HTMLInputElement>document.getElementById("nom"))?.validity.valid;
  var inputPrenom = (<HTMLInputElement>document.getElementById("prenom"))?.validity.valid;
  console.log(this.femme);
  this.submitted = true;

 if (this.file)
 this.formateur.photo=this.file.name ;
  if(this.femme){

   console.log("geenre",Egenre.FEMME);
    this.formateur.genre = {id : 2 , name : Egenre.FEMME} ;
 }
 if(this.homme){

  this.formateur.genre = {id : 1 , name : Egenre.HOMME} ;
} 
if((this.formateur.username.trim())&&(this.formateur.email.trim())&&(this.formateur.cv)&&(this.formateur.etablissement.trim())&&(this.formateur.lesSpecialites)
&&(this.formateur.genre)&&(inputNom)&&(inputPrenom)){
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

    if(this.selectedEtablissement[0].name!="Autre")
    this.formateur.etablissement=this.selectedEtablissement[0].name ;
    console.log("heeedhyyy",this.formateur)
   // this.formateur.password = "xx"
    this.formateurService.saveFormateur(this.formateur).subscribe( data => {
      console.log("data save Formateur",data);
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'formateur ajouter', life: 3000});
      window.location.reload();
    },
    error =>
   {
    this.messageService.add( {severity:'error', summary:'Error', detail: error.error.message, life: 3000}); 
    this.formateur.photo = null ;
  console.log("exception occured");});
}
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
  this.femme = "";
  this.homme=""
}

openSpecialite(){
  this.specialiteDialog = true ;
  this.spec = {
  id : 0 ,
  titre :"",
  listFormateur : []
  }
          }
saveSpecialite(){
            this.specialiteService.saveSpecialite(this.spec).subscribe(data => {
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'categorie Ajouter', life: 3000});
              this.getSpecialite
              this.specialiteDialog = false
            }
              )
          }
hideSpecialite(){

              this.specialiteDialog = false
              this.spec = {
                id : 0 ,
                titre :"",
                listFormateur : []
                }
          }

}
