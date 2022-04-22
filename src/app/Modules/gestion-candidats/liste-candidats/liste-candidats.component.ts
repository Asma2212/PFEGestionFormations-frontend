import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidat } from 'app/models/Candidat';
import { Classe } from 'app/models/Classe';
import { Department } from 'app/models/Departement';
import { CandidatService } from 'app/services/candidat.service';
import { DepartementService } from 'app/services/departement.service';
import { ConfirmationService, MessageService, SelectItem, SelectItemGroup } from 'primeng/api';

@Component({
  selector: 'app-liste-candidats',
  templateUrl: './liste-candidats.component.html',
  styleUrls: ['./liste-candidats.component.css']
})
export class ListeCandidatsComponent implements OnInit {

  listC : Classe[] ; 
  listD : Department[];
  d: Department ;
  c:Classe ;
  depSelected : boolean = false ;
  candidats: Candidat[];
  candidat : Candidat ; 
  listDep : Department[];
  listClass : Classe[];
  sortOptions: SelectItem[];
  groupedSpecialites: SelectItemGroup[];
  depItem : SelectItemGroup ;
  classItem : SelectItem ;
  listclass : SelectItem[];
  sortOrder: number;

  sortField: string;

  candidatDialog: boolean;
  submitted: boolean;
  uploadedFiles: any[] = [];
  file: File = null;
  public imagePath;
  imgURL: any;
  public message: string;

  constructor(private candidatService : CandidatService ,private departementService : DepartementService, private router: Router, private confirmationService : ConfirmationService , private messageService : MessageService) { }

  ngOnInit() {
    this.departementService.getAllDepartements().toPromise().then( data =>{
      this.listDep = data ; 
      console.log("departement :",data) });


  /*    this.listDep.forEach(dep => {
        this.depItem.label = dep.name ;
        console.log("deep 1 ",dep.name)
        dep.classes.forEach(c =>
          {
            this.classItem.label = c.Name ;
            this.listclass.push(this.classItem);
          })
          this.depItem.items = this.listclass ;
          this.groupedSpecialites.push(this.depItem);
      });
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
  ];*/
      
     this.candidatService.getAllCandidats().toPromise().then(
       data => this.candidats = data);

  }

  departementSelected(dep){
    if(dep){
    this.d = dep[0];
    console.log("hhheeey",this.d);
    //console.log("cc",this.candidat.department.id);
    this.depSelected = true ;
    this.listClass = dep[0].classes ;
   // this.candidat.department = dep[0];
  }}

  classeSelected(classe : Classe){
    if(classe){
    console.log("classssseeee",classe[0].name);
    this.c = classe[0];
    //console.log("cc",this.candidat.department.id);
   // this.candidat.classe = classe[0];
  }
  }
 ajouter(){
    this.router.navigateByUrl('/candidats/ajouter');
 }
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
    this.candidat = {...candidat};
    //this.imgURL = candidat.photo ;
    this.candidatDialog = true;

}

deleteCandidat(candidat: Candidat) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ?',//' + formateur.name + 'Are you sure you want to delete' + formateur.name + ' ?'
        header: 'Confirm',
        icon: 'pi pi-exclamateur-triangle',
        accept: () => {
            this.candidats = this.candidats.filter(val => val.id !== candidat.id);
            console.log(candidat.id);
            this.candidatService.deleteCandidat(candidat.id).subscribe( data => {
              console.log("data candidat deleted",data)
            });
            this.candidat = null;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Candidat Deleted', life: 3000});
        }
    });
}

saveCandidat() {
  this.submitted = true;
 // if(this.file)
  //this.formateur.photo=this.file.name ;
  this.candidat.department = this.listD[0];
  this.candidat.classe = this.listC[0];
  if (this.candidat.id) {
    this.candidatService.updateCandidat(this.candidat).subscribe( data => {
      console.log("data update candidat",data)
    });
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'candidat Updated', life: 3000});
}
else {
    console.log("heeedhyyy",this.candidat)
    this.candidatService.saveCandidat(this.candidat).subscribe( data => {
      console.log("data save candidat",data)
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'candidat Updated', life: 3000});

      this.candidatDialog = false;
      this.imgURL = false ;
      this.candidat = null;
      this.depSelected = false ;

    },
    error =>
   {
  console.log(error.error.message);
  this.messageService.add({severity:'Error', summary: 'Error', detail: error.error.message, life: 3000});
});
   }
          
      //this.candidats = [...this.candidats];
      

}

counter(i: number) {
  return new Array(i);
}

openNew(candidat: Candidat) {
  this.candidat = {...candidat};
  //this.imgURL = candidat.photo ;
  this.candidatDialog = true;

}



}

