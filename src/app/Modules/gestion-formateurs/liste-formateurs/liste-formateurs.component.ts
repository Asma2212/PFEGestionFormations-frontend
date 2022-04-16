import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formateur } from 'app/models/Formateur';
import { FormateurService } from 'app/services/formateur.service';
import { ConfirmationService, MenuItem, MessageService, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-liste-formateurs',
  templateUrl: './liste-formateurs.component.html',
  styleUrls: ['./liste-formateurs.component.css']
})
export class ListeFormateursComponent implements OnInit {
  items: MenuItem[];
  formateurs: Formateur[];
  formateur : Formateur ;

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
  constructor(private formateurService : FormateurService ,private router: Router, private confirmationService : ConfirmationService , private messageService : MessageService) { }

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
  
    
    /*       this.spacialiteService.getAllSpecialite().toPromise().then( data => {
        this.specialites = data ;
          console.log("everthing is okay geet categorie",data)
        });
     this.formateurService.getAllFormateurs().then(data => this.formateurs = data);
*/
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
    //this.formateur.photo=this.file.name ;
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
  if(this.file)
  //this.formateur.photo=this.file.name ;
  
          this.formateurService.updateFormateur(this.formateur).subscribe( data => {
            console.log("data update Formateur",data)
          });
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'formateur Updated', life: 3000});
      this.formateurs = [...this.formateurs];
      this.formateurDialog = false;
      this.imgURL = false ;
      this.formateur = null;
}

counter(i: number) {
  return new Array(i);
}
}
