import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formateur } from 'app/models/Formateur';
import { Specialite } from 'app/models/Specialite';
import { FormateurService } from 'app/services/formateur.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ajouter-formateur',
  templateUrl: './ajouter-formateur.component.html',
  styleUrls: ['./ajouter-formateur.component.css']
})
export class AjouterFormateurComponent implements OnInit {

  //formateurDialog : boolean = true;
  formateur : Formateur = new Formateur();
  specialite : Specialite = new Specialite();
  listSpecialites : Specialite[];
  value2: string;
  formateurAjoute : boolean = false;
  
  submitted: boolean;
  uploadedFiles: any[] = [];
  file: File = null;
  public imagePath;
  imgURL: any;
  roles : string[]
  public message: string;
  
  constructor(private router: Router, private formateurService : FormateurService,private messageService : MessageService) {
    this.formateurAjoute = false;
   }

  ngOnInit(): void {
    this.formateurAjoute = false;
    this.formateur = 
    {  id : 0,
    username : "" ,
    password : "AAA" ,
    name : "" ,
    email : "" ,
    role : ["formateur"],
    lastName : "" ,
    numTel : 0 ,
    dateNaiss : null ,
    photo : "" ,
    bio :"",
    cv : "" ,
    specialites : null ,
    genre : ""
  };
    
    this.specialite = {  idSp : 0,
      titre : "" ,
      niveauEtude : "" ,
      listFormateur : null };
      this.listSpecialites.push(this.specialite);

    
  }
  cancel(){

  }
  saveFormateur(){
    //this.formateurAjoute = true ; 
    console.log(this.formateur);
    /*this.formateurService.saveFormateur(this.formateur).subscribe( data => {
      console.log("data save Formateur",data)
    });*/
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'formateur saved', life: 3000});

  }
  retour(){
    
  }
  ajouterFormateur(){
    this.formateurAjoute = false ;

    this.router.navigateByUrl('/formateurs/ajouter');

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
      console.log("imaage",this.file.name) 
    }
    this.formateur.photo=this.file.name ;
  }


}
