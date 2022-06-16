import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidat } from 'app/models/Candidat';
import { Classe } from 'app/models/Classe';
import { Department } from 'app/models/Departement';
import { Egenre } from 'app/models/GenreEnum';
import { CandidatService } from 'app/services/candidat.service';
import { DepartementService } from 'app/services/departement.service';
import { UploadFileService } from 'app/services/upload-file.service';
import { ConfirmationService, MessageService, SelectItem, SelectItemGroup } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-liste-candidats',
  templateUrl: './liste-candidats.component.html',
  styleUrls: ['./liste-candidats.component.css']
})
export class ListeCandidatsComponent implements OnInit {

  maxDate1 : Date = new Date();
  femme : string ;
  homme : string ;
  listC : Classe[] = [] ;
  listD : Department[] = [];
  d: Department ;
  c:Classe ;
  depSelected : boolean = false ;
  candidats: Candidat[];
  candidat : Candidat ;
  listDep : Department[] = [];
  listClass : Classe[] = [];
  listClassAll : Classe[] =[];
  sortOptions: SelectItem[];
  groupedSpecialites: SelectItemGroup[];
  depItem : SelectItemGroup ;
  classItem : SelectItem ;
  listclass : SelectItem[];
  sortOrder: number;
  allCandidats : Candidat[]

  sortField: string;

  candidatDialog: boolean;
  submitted: boolean;
  uploadedFiles: any[] = [];
  file: File = null;
  public imagePath;
  imgURL: any;
  public message: string;
  selectedFiles1: FileList;
  currentFile1: File;
  progress1 = 0;
  message1 = '';
  fileInfos: Observable<any>;
  filterDep : Department;
  filterClass : Classe;
  filterValue : string ="";
  dateNaiss :Date = null;
  dateChange :boolean = false ;

  constructor(private candidatService : CandidatService ,private uploadService : UploadFileService ,private departementService : DepartementService, private router: Router, private confirmationService : ConfirmationService , private messageService : MessageService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.fileInfos = this.uploadService.getFiles();

    this.departementService.getAllDepartements().subscribe( data =>{
      this.listDep = data ;
    this.listDep.forEach(d => {
     d.classes.forEach(c => {
       this.listClassAll.push(c)
     });
      
    }); });
this.getAllCandidats()



  }
  getAllCandidats(){
    this.candidatService.getAllCandidats().subscribe(
      data => {
      this.candidats = data ;
      this.allCandidats = this.candidats ;
      });
  }

  departementSelected(dep){
    if(dep[0]){
      this.listC = []
    this.d = dep[0];
    this.depSelected = true ;
    this.listClass = dep[0].classes ;
   this.candidat.department = dep[0];
  }}

  classeSelected(classe : Classe){
    if(classe[0]){
    this.c = classe[0];
   this.candidat.classe = classe[0];
  }
  }
 ajouter(){
    this.router.navigateByUrl('/candidats/ajouter');
 }
 testImage(t : string){
  return t.includes("image") ;
}
 upload1() {
  this.progress1 = 0;
  this.currentFile1 = this.selectedFiles1.item(0);
  this.uploadService.upload(this.currentFile1).subscribe(
    event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress1 = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.message1 = "télécharger avec succées";
      }
    },
    err => {
      this.progress1 = 0;
      if(err.error.message.includes("constraint"))
        this.message1 =" l'image existe deja"
        else
        this.message1 = ' Un probleme est survenue';
      this.currentFile1 = undefined;
    });
  this.selectedFiles1 = undefined;
}
 onUpload(event){
  this.selectedFiles1 = event.target.files;
  this.file = <File>event.target.files[0]
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
  editCandidat(candidat: Candidat) {
    this.listD.push(candidat.department)
    this.listC.push(candidat.classe)
    this.depSelected = true ;
    this.listClass = this.listD[0].classes ;
    if(candidat.genre.name == "FEMME")
    this.femme = "Femme" ;
    else
    this.homme = "Homme"
    this.candidat = {...candidat};
    //this.imgURL = candidat.photo ;
    this.candidatDialog = true;
    this.dateNaiss = new Date(candidat.dateNaiss)

}

deleteCandidat(candidat: Candidat) {
    this.confirmationService.confirm({
      acceptLabel:"supprimer",
      acceptButtonStyleClass:"p-button-danger",
      rejectLabel:"annuler",
      rejectButtonStyleClass:"p-button-info",
        message: 'Etes-vous sûr que vous voulez supprimer '+candidat.lastName +' '+ candidat.firstName+' ?',//' + candidat.name + 'Are you sure you want to delete' + candidat.name + ' ?'
        header: 'Confirm',
        icon: 'pi pi-exclamateur-triangle',
        accept: () => {
            this.candidats = this.candidats.filter(val => val.id !== candidat.id);
            this.candidatService.deleteCandidat(candidat.id).subscribe( data => {
            });
            this.candidat = null;
            this.messageService.add({severity:'success', summary: 'Succés', detail: 'Candidat Supprimer', life: 3000});
            this.getAllCandidats()
        }
    });
}

saveCandidat() {
  this.submitted = true;
  var inputNom = (<HTMLInputElement>document.getElementById("nom"))?.validity.valid;
  var inputPrenom = (<HTMLInputElement>document.getElementById("prenom"))?.validity.valid;
  var inputCin = (<HTMLInputElement>document.getElementById("cin"))?.validity.valid;
  if (this.file)
  this.candidat.photo=this.file.name ;
 // if(this.file)
  //this.candidat.photo=this.file.name ;
 // this.candidat.department = this.listD[0];
 // this.candidat.classe = this.listC[0];
 if(this.femme){
   this.candidat.genre = {id : 2 , name : Egenre.FEMME} ;
}
if(this.homme){

 this.candidat.genre = {id : 1 , name : Egenre.HOMME} ;
}
if(this. dateChange)
this.dateNaiss.setDate(this.dateNaiss.getDate()+1)
this.candidat.dateNaiss = this.dateNaiss
if((this.candidat.username.toString().length == 8)&&(this.candidat.email.trim())&&(this.candidat.department)&&(this.candidat.classe)
&&(this.candidat.genre)&&(inputNom)&&(inputPrenom)){
  if (this.candidat.id) {
    this.candidatService.updateCandidat(this.candidat).subscribe( data => {
      this.messageService.add({severity:'success', summary: 'Succés', detail: 'candidat est mise à jour', life: 3000});
       //window.location.reload();
      this.hideDialog()
      this.getAllCandidats()
    });

}
else {
  this.candidat.password="xx"
    this.candidat.photo=this.file.name ;
    this.candidatService.saveCandidat(this.candidat).subscribe( data => {
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'candidat Ajouter', life: 3000});
      this.getAllCandidats()
      this.hideDialog()

    },
    error =>
   {
    if(error.status == 400)
    this.messageService.add( {severity:'error', summary:'Déja existant', detail: "Email et cin doit etre unique", life: 3000}); 
});
   }
  }
      //this.candidats = [...this.candidats];

this.dateChange = false
}

counter(i: number) {
  return new Array(i);
}

openNew(candidat: Candidat) {
  this.candidat = {...candidat};
  //this.imgURL = candidat.photo ;
  this.candidatDialog = true;

}
hideDialog() {
  this.candidatDialog = false;
  this.candidat = null ;
  this.submitted = false;
  this.imgURL = null ;
  this.uploadedFiles = [];
  this.file  = null;
  this.message = '';
  this.selectedFiles1 = null;
  this.currentFile1=null;
  this.progress1 = 0;
  this.message1 = '';
  this.depSelected = false ;
  this.femme ="";
  this.homme="";
  this.listD = []
  this.listC = []
  this.dateChange = false
  this.dateNaiss = null

}

applyFilter(){
  this.candidats= this.allCandidats
  console.log("ff",this.filterValue);
 let filterValueLower = this.filterValue.toLowerCase();
if(this.filterValue != '') {
this.candidats= this.allCandidats.filter(f => f.firstName.toLowerCase().includes(filterValueLower) || f.lastName.toLowerCase().includes(this.filterValue));
}
if(this.filterDep != null){
  let filterValueLower = this.filterDep[0].name.toLowerCase();
  console.log("ff1",this.filterDep[0].name);
this.candidats = this.candidats.filter(f => f.department.name.toLowerCase().includes(filterValueLower));
}
if(this.filterClass != null){
  this.candidats = this.candidats.filter(f =>
    f.classe.name === this.filterClass[0].name)
    
}
}

}

