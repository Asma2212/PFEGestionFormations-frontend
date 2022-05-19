import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../../../../services/auth.service";
import {Router} from "@angular/router";
import {MessageService, SelectItem, SelectItemGroup} from "primeng/api";
import {ToastrService} from "ngx-toastr";
import {Observable, throwError} from "rxjs";
import {loginRequestPayload} from "../../../payload/login-request-payload";
import {CandidatRequestSignupPayload} from "../../../payload/CandidatRequestSignupPayload";
import {PasswordModule} from 'primeng/password';
import {Department} from "../../../../../models/Departement";
import {Classe} from "../../../../../models/Classe";
import {DepartementService} from "../../../../../services/departement.service";
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadFileService } from 'app/services/upload-file.service';
import { Candidat } from 'app/models/Candidat';
import { Egenre } from 'app/models/GenreEnum';
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-candidat-register',
  templateUrl: './candidat-register.component.html',
  styleUrls: ['./candidat-register.component.scss']
})
export class CandidatRegisterComponent implements OnInit {


  n : string = "Espace Condidat";
  loginForm: FormGroup;
  signupForm: FormGroup;
  isError: boolean;
  isError_signup: boolean;

  loginRequestPayload: Candidat;
  loginRequest : loginRequestPayload;
  validateEmail = true;
  private errors: string;
  minDate: Date;
  maxDate: Date;
  listDep : Department[];
  listD : Department[] =[];
  listC : Classe[] =[];
  d: Department ;
  c:Classe ;
  listClass : Classe[];
  depItem : SelectItemGroup ;
  classItem : SelectItem ;
  listclass : SelectItem[];
  namePhoto:string;
  depSelected : boolean = false ;

  uploadedFiles: any[] = [];
  file: File = null;
  public imagePath;
  imgURL: any = null ;
  currentFile: File;
  progress = 0;
  message = '';
  fileInfos: Observable<any>;
  selectedFile : FileList ;

  candidat : Candidat = {
    id : 0,
    username : "" ,//cin
    password : "" ,
    firstName : "",
    email : "",
    role : [],
    lastName : "" ,
    numTel : 0,
    dateNaiss : null,
    genre : null,
    bio : "",
    photo : "",
    department : null,
    classe : null
  }

  constructor(private toast:NgToastService,private authService: AuthService, private router: Router,private uploadService : UploadFileService, private messageService: MessageService, private toastr: ToastrService,private departementService : DepartementService) {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 50, 0, 1);
    this.maxDate = new Date(currentYear -10, 11, 31);

    this.loginRequestPayload = {
      id : 0 ,
      username : "", //cin
      password : "",
      firstName : "",
      email : "",
      role : [] ,
      lastName : "",
      numTel : 0 ,
      dateNaiss : null ,
      genre : null,
      bio : "",
      photo : "",
      department : null, // TI , GC , GM , GE (enum) // niveauEtude : string ; // licence / master (enum)
      classe : null

    };

    this.loginRequest = {
      username : "", //cin
      password : "",
      email : "",

    };

  }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl('')
  })



    this.signupForm = new FormGroup({
      username_signup: new FormControl(''),
      password_signup: new FormControl(''),
      email_signup: new FormControl(''),
      date_naiss: new FormControl(''),
      phone: new FormControl(''),
      first_name: new FormControl('')
      , last_name: new FormControl(''),
/*
      repassword : new FormControl(''),
*/
      genre : new  FormControl(''),
      department : new  FormControl(''),
      classe : new FormControl(''),
    })
    this.departementService.getAllDepartements().toPromise().then( data =>{
      this.listDep = data ;
      console.log("departement :",data) });
  }

  login() {
    console.log("username" + this.loginForm.get('username').value + "email" + this.loginForm.get('email').value + "password" + this.loginForm.get('password').value)


    this.loginRequest.username = this.loginForm.get('username').value;
    this.loginRequest.email = this.loginForm.get('email').value;
    this.loginRequest.password = this.loginForm.get('password').value;

    this.authService.loginCandidat(this.loginRequest).subscribe(data => {

      this.isError = false;
      console.log("you are here")
      this.router.navigate(['/ggggg']);
    }, error => {
      this.toast.error({detail:"enter vos informations correctements !",duration:3000});

      //this.isError = true;
      console.log("error occured",error)
      //throwError(error);
      //this.errors = error.error.message;

    });

  }
  signup() {
    console.log("deeep",
      this.signupForm.get('department').value)
this.upload1()
this.loginRequestPayload.photo = this.file.name;
if(this.signupForm.get('genre').value == "femme"){

  console.log("geenre",Egenre.FEMME);
   this.loginRequestPayload.genre = {id : 2 , name : Egenre.FEMME} ;
}
if(this.signupForm.get('genre').value == "homme"){

 this.loginRequestPayload.genre = {id : 1 , name : Egenre.HOMME} ;
}
    this.loginRequestPayload.username = this.signupForm.get('username_signup').value;
    this.loginRequestPayload.firstName = this.signupForm.get('first_name').value;
    this.loginRequestPayload.lastName = this.signupForm.get('last_name').value;
    this.loginRequestPayload.email = this.signupForm.get('email_signup').value;
    this.loginRequestPayload.password = this.signupForm.get('password_signup').value;
      this.loginRequestPayload.classe= this.signupForm.get('classe').value[0]
      this.loginRequestPayload.numTel= this.signupForm.get('phone').value
      this.loginRequestPayload.department= this.signupForm.get('department').value[0]
      this.loginRequestPayload.dateNaiss= this.signupForm.get('date_naiss').value

    // this.loginRequestPayload.photo = this.file.name ;
    console.log("signUP",this.loginRequestPayload)
    this.authService.signupCandidat(this.loginRequestPayload).subscribe(data => {
      console.log("registred")
      this.isError_signup = false;
      this.login()
      this.router.navigate(['/ggggggggg']);

    }, error => {
      console.log(error.error.message)
      throwError(error);
      this.errors = error.error.message;
    });

  }
  departementSelected(){
   const dep = this.signupForm.get('department').value
/*
   console.log("mloueeel",dep)
*/
    if(dep[0]){
      this.d = dep[0];
/*
      console.log("hhheeey",this.d);
*/
      //console.log("cc",this.candidat.department.id);
      this.depSelected = true ;
      this.listClass = dep[0].classes ;
      console.log("classe",this.listClass)
     //this.signupForm.depC = dep[0];
    }}

  classeSelected(){
    const classe = this.signupForm.get('classe').value
    if(classe[0]){
      console.log("classssseeee",classe[0].name);
      this.c = classe[0];
      //console.log("cc",this.candidat.department.id);
    // this.candidat.classe = classe[0];
    }
  }

    onUpload(event){
      if (event.target.files.length > 0)
      {
        this.selectedFile = event.target.files;
       this.file = event.target.files[0];
        //this.userFile = file;
       // this.f['profile'].setValue(file);

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
      }
      console.log("file name ", this.file.name)
      }
    this.namePhoto=this.file.name ;
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

}
