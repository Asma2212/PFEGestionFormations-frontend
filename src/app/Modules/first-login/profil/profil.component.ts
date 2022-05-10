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

  submitted: boolean = false;

  constructor(public formateurService : FormateurService, private router: Router) { }

  ngOnInit() { 
     // this.personalInformatio;
     this.firstName="";
     this.lastName=""
  }

  nextPage() {
      //if (this.firstName && this.lastName) {
         // this.ticketService.ticketInformation.personalInformation = this.personalInformation;
         localStorage.setItem('firstName',this.firstName)
         localStorage.setItem('lastName',this.lastName);
          this.router.navigate(['firstLogin/photo']);

          return;
      //}

      this.submitted = true;
  }
}
