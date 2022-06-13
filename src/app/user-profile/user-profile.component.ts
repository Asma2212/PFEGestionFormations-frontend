import { Component, OnInit } from '@angular/core';
import {BlockableUI} from "primeng/api";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {User} from "../models/User";
import { UserService } from 'app/services/user.service';
import { Egenre } from 'app/models/GenreEnum';
import { Observable } from 'rxjs';
import { UploadFileService } from 'app/services/upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  display: boolean = false;
  femme : string ;
  homme: string ;
  uploadedFiles: any[] = [];
  file: File = null;
  public imagePath;
  imgURL: any = null ;
  currentFile: File;
  progress = 0;
  message = '';
  fileInfos: Observable<any>;
  selectedFile : FileList ;
/*
  isEditable: boolean;
*/
  geeks: boolean;
  profilForm:  FormGroup;
   TheCurrentUser: User = {
    id : 0,
    username : "",
    password : "",
    firstName : "",
    email : "",
    role : [],
    lastName : "",
    numTel : 0,
    dateNaiss : null ,
    genre : null,
    photo:"",
    bio : "",
    created: null
   };

  constructor(private authService: AuthService, private userService : UserService,private uploadService : UploadFileService) {

    /*   this.isEditable=true ;
     */

  }

  ngOnInit() {
    this.fileInfos = this.uploadService.getFiles();

    this.detailsUserAdmin()




  }

  testImage(t : string){
    return t.includes("image") ;
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
          this.message = "télécharger avec succées";
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

  gfg() {
    this.geeks = true;
  }
  detailsUserAdmin(){
    this.authService.currentUserDetail().subscribe(data=>{
      this.TheCurrentUser=data ;
      if(this.TheCurrentUser.genre.name == "FEMME")
      this.femme = "femme" ;
      else
      this.homme = "homme"
      console.log(data);

    })
  }
  updateAdmin(){
    if(this.file) {
      this.upload1()
      this.TheCurrentUser.photo = this.file.name
    }
    if(this.femme){
      console.log("geenre",Egenre.FEMME);
       this.TheCurrentUser.genre = {id : 2 , name : Egenre.FEMME} ;
    }
    if(this.homme){

     this.TheCurrentUser.genre = {id : 1 , name : Egenre.HOMME} ;
    }
    this.userService.updateFormateur(this.TheCurrentUser).subscribe(data => {
      console.log(data)
      window.location.reload();

    })
    console.log(this.TheCurrentUser)

  }


}
