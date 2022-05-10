import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  firstName : String ;
  constructor( private router: Router) { }

  ngOnInit() { 
      //this.ticketInformation = this.ticketService.ticketInformation;
  }

  complete() {
     this.firstName = localStorage.getItem('firstName')
  }

  prevPage() {
      this.router.navigate(['firstLogin/photo']);
  }
}

