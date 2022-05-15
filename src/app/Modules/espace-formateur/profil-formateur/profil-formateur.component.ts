import { Component, OnInit } from '@angular/core';
import { Formateur } from 'app/models/Formateur';
import { FormateurService } from 'app/services/formateur.service';
import { UploadFileService } from 'app/services/upload-file.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profil-formateur',
  templateUrl: './profil-formateur.component.html',
  styleUrls: ['./profil-formateur.component.scss']
})
export class ProfilFormateurComponent implements OnInit {

  formateur : Formateur
  date1 : Date ;
  femme : string ;
  homme : string ;
  fileInfos : Observable<any> ;
  nbAvenir : number ;
  nbPasser : number ;
  age : number ; 
  constructor(private formateurService : FormateurService ,private uploadService : UploadFileService,private messageService : MessageService) { }

  ngOnInit(): void {
    this.nbPasser=0;
    this.nbAvenir=0;
    this.formateurService.getFormateurById(3).toPromise().then(data => {
      this.formateur = data ;
      this.age = new Date().getFullYear() - new Date(this.formateur.dateNaiss).getFullYear()
      this.date1 = new Date(this.formateur.dateNaiss)
      if(this.formateur.genre.name == "FEMME")
      this.femme = "Femme" ;
      else
      this.homme = "Homme"
      console.log("aaa",data.sessionFormationList);
     /* this.nbPasser = this.formateur.sessionFormationList.filter(s => 
        new Date(s.dateFinSession) < new Date()).length ;
        this.nbAvenir = this.formateur.sessionFormationList.filter(s => 
          new Date(s.dateDebSession) > new Date()).length*/

    })
    this.fileInfos = this.uploadService.getFiles();
  }
  testImage(t : string){
    return t.includes("image") ;
 }
 saveChanges(){
  this.formateurService.updateFormateur(this.formateur).toPromise().then(data =>{
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'vos informations sont bien modifier', life: 3000});
   })
   this.ngOnInit();
 }
}