import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formateur } from 'app/models/Formateur';
import { Egenre } from 'app/models/GenreEnum';
import { TicketService } from 'app/services/Ticket.service';
import { UploadFileService } from 'app/services/upload-file.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  constructor( private router: Router,private uploadService : UploadFileService) { }

  classes: any[];

  vagons: any[];
  
  seats: any[];

  seatInformation: any;
  formateur : Formateur ;
  bio : string ;
  file: File = null;
  public imagePath;
  imgURL: any = null ;
  currentFile: File;
  progress = 0;
  message = '';
  fileInfos: Observable<any>;
  selectedFile : FileList ;

  ngOnInit() { 
    this.fileInfos = this.uploadService.getFiles();
    this.formateur = JSON.parse(localStorage.getItem('formateur'));
    console.log("send",this.formateur)
    this.bio = ""
  
  }


  nextPage() {
    if(this.file)
          this.formateur.photo = this.file.name ;
          localStorage.setItem('formateur', JSON.stringify(this.formateur));
          this.router.navigate(['firstLogin/securite']);
    //  }
  }

  prevPage() {
      this.router.navigate(['firstLogin/profil']);
  }

  onUpload(event){
    this.selectedFile = event.target.files;
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
      console.log("imaage",this.imgURL.url) 
    }
  }

  upload1() {
    this.progress = 0;
    this.currentFile = this.selectedFile.item(0);
    console.log("current file",this.currentFile);
    
    this.uploadService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
        }
      },
      err => {
        this.progress = 0;
        console.log(err);
        if(err.error.message.includes("constraint"))
        this.message =" Cette image existe deja"
        else
        this.message = ' Un probleme est survenue';
        this.currentFile = undefined;
      });
    this.selectedFile = undefined;
  }

  testImage(t : string){
    return t.includes("image") ;
 }
}
