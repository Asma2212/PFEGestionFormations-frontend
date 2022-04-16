import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidat } from 'app/models/Candidat';
import { CandidatService } from 'app/services/candidat.service';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-liste-candidats',
  templateUrl: './liste-candidats.component.html',
  styleUrls: ['./liste-candidats.component.css']
})
export class ListeCandidatsComponent implements OnInit {
  candidats: Candidat[];
  candidat : Candidat ;

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;

  candidatDialog: boolean;
  submitted: boolean;
  uploadedFiles: any[] = [];
  file: File = null;
  public imagePath;
  imgURL: any;
  public message: string;

  constructor(private candidatService : CandidatService ,private router: Router, private confirmationService : ConfirmationService , private messageService : MessageService) { }

  ngOnInit() {
  
    
    /*     
     this.candidatService.getAllCandidats().then(data => this.candidats = data);
*/
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
  if(this.file)
  //this.formateur.photo=this.file.name ;
  
          this.candidatService.updateCandidat(this.candidat).subscribe( data => {
            console.log("data update candidat",data)
          });
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'candidat Updated', life: 3000});
      this.candidats = [...this.candidats];
      this.candidatDialog = false;
      this.imgURL = false ;
      this.candidat = null;
}

counter(i: number) {
  return new Array(i);
}
}

