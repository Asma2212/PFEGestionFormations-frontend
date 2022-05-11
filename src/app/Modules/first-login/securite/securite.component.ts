import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formateur } from 'app/models/Formateur';

@Component({
  selector: 'app-securite',
  templateUrl: './securite.component.html',
  styleUrls: ['./securite.component.scss']
})
export class SecuriteComponent implements OnInit {
  constructor( private router: Router) { }

  classes: any[];

  vagons: any[];
  
  seats: any[];

  seatInformation: any;
  formateur : Formateur ;
  bio : string ;

  ngOnInit() { 
     // this.seatInformation = this.ticketService.ticketInformation.seatInformation;
this.bio = ""
  
  }


  nextPage() {
    //  if (this.formateur.bio) {
      localStorage.setItem('bio',this.bio)
        //this.formateur.bio 
          //this.ticketService.ticketInformation.seatInformation = this.seatInformation;
          this.router.navigate(['firstLogin/confirmation']);
    //  }
  }

  prevPage() {
      this.router.navigate(['firstLogin/photo']);
  }
}
