import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formateur } from 'app/models/Formateur';
import { TicketService } from 'app/services/Ticket.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  constructor( private router: Router) { }

  classes: any[];

  vagons: any[];
  
  seats: any[];

  seatInformation: any;
  formateur : Formateur ;
  bio : string ;

  ngOnInit() { 
    this.bio = ""
  
  }


  nextPage() {
    //  if (this.formateur.bio) {
      localStorage.setItem('bio',this.bio)
        //this.formateur.bio 
          //this.ticketService.ticketInformation.seatInformation = this.seatInformation;
          this.router.navigate(['firstLogin/securite']);
    //  }
  }

  prevPage() {
      this.router.navigate(['firstLogin/profil']);
  }
}
