import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formateur } from 'app/models/Formateur';
import { Genre } from 'app/models/Genre';
import { Specialite } from 'app/models/Specialite';
import { FormateurService } from 'app/services/formateur.service';
import { SpecialiteService } from 'app/services/specialite.service';
import { ConfirmationService, MenuItem, MessageService, SelectItem, SelectItemGroup } from 'primeng/api';

@Component({
  selector: 'app-liste-formateurs',
  templateUrl: './liste-formateurs.component.html',
  styleUrls: ['./liste-formateurs.component.css']
})
export class ListeFormateursComponent implements OnInit {
  genre : Genre;
  femme : boolean ;
  homme : boolean ;
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
  public imagePath;
  imgURL: any;
  public message: string;
//private formateurService: FormateurService
  constructor(private formateurService : FormateurService ,private specialiteService : SpecialiteService ,private router: Router, private confirmationService : ConfirmationService , private messageService : MessageService) { }

  ngOnInit() {
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
 ajouter(){
    this.router.navigateByUrl('/formateurs/ajouter');
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
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Formation Deleted', life: 3000});
        }
    });
}

saveFormateur() {
  this.submitted = true;
  //this.formateur.photo=this.file.name ;
/*  if(this.femme){
    this.genre.id = 2 ; 
    this.genre.name = "FEMME" ;
    this.formateur.genre = this.genre ;
 }
 if(this.homme){
   this.genre.id = 1 ; 
   this.genre.name = "HOMME" ;
   this.formateur.genre = this.genre ;
} */
  if (this.formateur.id) {
    //this.genre = this.formateur.genre ;
    console.log("before update",this.formateur);
    this.formateurService.updateFormateur(this.formateur).subscribe( data => {
      console.log("data update Formateur",data)
    });
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'formateur Updated', life: 3000});
}
else {
   // this.formateurs.push(this.formateur);
 /*   this.formateurService.saveFormateurData(formData).subscribe( data => {
    
      console.log("data type",data.type)
      console.log("data get",data.get)
      console.log("data",data)
    }); */
    console.log("heeedhyyy",this.formateur)
    this.formateurService.saveFormateur(this.formateur).subscribe( data => {
      console.log("data save Formateur",data)
    },
    error =>
   {
  console.log("exception occured");});
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'formateur ajouter', life: 3000});
}
      this.formateurs = [...this.formateurs];
      this.formateurDialog = false;
      this.imgURL = false ;
      this.formateur = null;
}

counter(i: number) {
  return new Array(i);
}
openNew(formateur: Formateur) {
  this.formateur = {...formateur};
  //this.imgURL = formateur.photo ;
  this.formateurDialog = true;

}

/*setGenre(){

 if(this.formateur.genre.id == 2)
 {
   this.femme = true ;
   console.log(this.formateur.genre)
 }
}*/
}
