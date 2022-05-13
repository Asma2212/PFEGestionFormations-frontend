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
  password : string="" ; 
  password2 : string="" ;
  submitted:boolean = false ; 
  confirm : boolean = true ;
  bio : string ;

  ngOnInit() { 
     // this.seatInformation = this.ticketService.ticketInformation.seatInformation;
     this.formateur = JSON.parse(localStorage.getItem('formateur'));
  
  }


  nextPage() {
this.submitted = true ;
    if(this.password && this.password2){
    this.formateur.password = this.password ;
      localStorage.setItem('formateur', JSON.stringify(this.formateur));
          this.router.navigate(['firstLogin/confirmation']);
    }

  }

  prevPage() {
      this.router.navigate(['firstLogin/photo']);
  }
  confirmPass(){
if(this.password != this.password2)
this.confirm = false ;
else
this.confirm = true ;
  }
  validateur(){
    if( this.confirm==true){
      console.log('ok');
      return 'green';
    }
    else{
      console.log('leeee');
      return 'red';
    }
  }
}
