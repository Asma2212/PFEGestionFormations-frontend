import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formateur } from 'app/models/Formateur';
import { FormateurService } from 'app/services/formateur.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { UploadFileService } from 'app/services/upload-file.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  formateur : Formateur;
  fileInfos: Observable<any>;
  constructor( private router: Router,private formateurService : FormateurService,private messageService : MessageService,private uploadService : UploadFileService) { }

  ngOnInit() { 
    this.fileInfos = this.uploadService.getFiles();
    this.formateur = JSON.parse(localStorage.getItem('formateur'));
      //this.ticketInformation = this.ticketService.ticketInformation;
  }

  complete() {
     //this.firstName = localStorage.getItem('firstName')
     this.formateurService.updateFormateur(this.formateur).toPromise().then(data =>{
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'vos informations sont bien rempli', life: 3000});
     })
  }

  prevPage() {
      this.router.navigate(['firstLogin/securite']);
  }
  testImage(t : string){
    return t.includes("image") ;
 }
}

