import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidat } from 'app/models/Candidat';
 
@Component({
  selector: 'app-ajouter-candidat',
  templateUrl: './ajouter-candidat.component.html',
  styleUrls: ['./ajouter-candidat.component.css']
})
export class AjouterCandidatComponent implements OnInit {

  candidat : Candidat ;
  candidatAjoute : boolean = false ;
  constructor(private router : Router) { }

  ngOnInit(): void {
    /*this.candidat = {  id : 0,
      username : "" ,
      email : "" ,
      password : "" ,
      name : "" ,
      lastName : "" ,
      numTel : 0 ,
      photo : "" };*/
  } 
  saveCandidat(){
    this.candidatAjoute = true ; 
    

  }
  retour(){
    
  }
  ajouterCandidat(){
    this.candidatAjoute = false ;
    this.router.navigateByUrl('/candidats/ajouter');

  }

}
