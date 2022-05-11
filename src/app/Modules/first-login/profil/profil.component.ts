import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formateur } from 'app/models/Formateur';
import { FormateurService } from 'app/services/formateur.service';
import { TicketService } from 'app/services/Ticket.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

firstName : string ;
lastName : string ;
formateur : Formateur
  submitted: boolean = false;

  constructor(public formateurService : FormateurService, private router: Router) { }

  ngOnInit() { 
     // this.personalInformatio;
     /*this.formateurService.getFormateurById(3).toPromise().then(data => {
       console.log(data);
     })*/
     if(this.formateur.firstName != ""){
     this.firstName = this.formateur.firstName 
     }else{
     this.firstName= ""
     this.formateur.firstName = ""
     }
     if(this.formateur.lastName !=""){
     this.lastName = this.formateur.lastName 
     }else
     this.lastName=""

  }

  nextPage() {
      if (this.firstName && this.lastName) {


// Retrieve the object from storage
         localStorage.setItem('firstName',this.firstName)
         localStorage.setItem('lastName',this.lastName);
          this.router.navigate(['firstLogin/photo']);

          return;
      }

      this.submitted = true;
  }
}
