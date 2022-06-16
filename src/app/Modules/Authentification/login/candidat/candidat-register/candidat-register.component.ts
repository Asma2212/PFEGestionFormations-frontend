import {ChangeDetectorRef, Component, OnInit, Optional} from '@angular/core';
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
import { CandidatService } from 'app/services/candidat.service';
import { LocalStorageService } from 'ngx-webstorage';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-candidat-register',
  templateUrl: './candidat-register.component.html',
  styleUrls: ['./candidat-register.component.scss']
})
export class CandidatRegisterComponent implements OnInit {


  n : string = "Espace Candidat";
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
  enterEmailDialog : boolean = false ;
  email : string = "";
  cand : Candidat ;
  verifierEmailDialog : boolean = false ;
  testEmail : boolean = true ;
  submitted : boolean = false;
  code : string =""
  codeValide : string = ""
  verifierCodeDialog : boolean = false;
  changePasswordDialog : boolean = false;
  password : string =""
  password2 : string = ""
  confirm : boolean = true ;
  confirmCode : boolean = true;
  conf : boolean = true

  candidat : Candidat = {
    id : 0,
    username : "" ,//cin
    password : "" ,
    created : new Date() ,
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
    classe : null,
    sessionFormationList : []
  }

  constructor( private cd: ChangeDetectorRef,  @Optional() public dialogRef: MatDialogRef<CandidatRegisterComponent>
    ,private toast:NgToastService,private authService: AuthService, private router: Router,private uploadService : UploadFileService, private toastr: ToastrService,private departementService : DepartementService,private candidatService : CandidatService,private messageService : MessageService,private localStorage: LocalStorageService) {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 50, 0, 1);
    this.maxDate = new Date(currentYear -10, 11, 31);

    this.loginRequestPayload = {
      id : 0 ,
      username : "", //cin
      password : "",
      created : new Date() ,
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
      classe : null,
      sessionFormationList : []

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
      password_signup2: new FormControl(''),
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
    this.departementService.getAllDepartements().subscribe( data =>{
      this.listDep = data ;
      console.log("departement :",data) });
  }
  CofirmerPass(){
if(this.signupForm.get('password_signup').value == this.signupForm.get('password_signup').value)
  this.conf = true
  else
  this.conf = false
  }
  login() {
    this.loginRequest.username = this.loginForm.get('username').value;
    this.loginRequest.email = this.loginForm.get('email').value;
    this.loginRequest.password = this.loginForm.get('password').value;
    this.authService.loginCandidat(this.loginRequest).subscribe(data => {
    this.isError = false;
   try {
    this.dialogRef.close()
   } catch (error) {
    true
   }
    
    this.router.navigate(['/candidat/myList']);
    this.toast.success({detail:"Bienvenu "+this.signupForm.get('username').value+"!",duration:3000});

    }, error => {
      if(error.status===400){      this.toast.error({summary: 'Verifier vos informations"',detail: "Erreur",duration:3000});
      }
else
        if(error.error.message == "Vous n'etes pas un candidat")
      this.messageService.add({severity:'error', summary: 'Erreur', detail: "Verifier vos informations", life: 3000});
      else
      this.isError = true;
      //this.isError = true;
      //throwError(error);
      //this.errors = error.error.message;

    });
if(this.isError == false )
this.messageService.add({severity:'error', summary: 'Erreur', detail: "adresse Email inexistante", life: 3000});
  }
  signup() {
   /* console.log("deeep",
      this.signupForm.get('department').value)*/
this.upload1()
this.loginRequestPayload.photo = this.file.name;
if(this.signupForm.get('genre').value == "femme"){

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
/*
    console.log("signUP",this.loginRequestPayload)
*/
    this.authService.signupCandidat(this.loginRequestPayload).subscribe(data => {
/*
      console.log("registred")
*/
      this.cd.detectChanges();

      this.isError_signup = false;
      this.loginAfterSignup( this.loginRequestPayload.username, this.loginRequestPayload.email, this.loginRequestPayload.password)
      this.dialogRef.close()
      this.router.navigate(['/candidat/myList']);


    }, error => {
      console.log(error.error.message)
      throwError(error);
      this.errors = error.error.message;
    });

  }
  loginAfterSignup(username:string,email:string,password:string) {


    this.loginRequest.username = username
    this.loginRequest.email = email
    this.loginRequest.password = password

    this.authService.loginCandidat(this.loginRequest).subscribe(data => {

      this.isError = false;
      //console.log("you are here")
      this.router.navigate(['/candidat/myList']);
      this.toast.success({detail:"Bienvenu "+this.signupForm.get('first_name').value+"!",duration:3000});

    }, error => {

      this.toast.error({detail:"enter vos informations correctements !",duration:3000});

      //this.isError = true;
      console.log("error occured",error)
      //throwError(error);
      //this.errors = error.error.message;

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
  testImage(t : string){
    return t.includes("image") ;
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
    PasMoiDialog(){
      this.verifierEmailDialog = false;
      this.enterEmailDialog = true ;
      this.email = ""
      this.submitted = false
      this.password =""
      this.password2=""
    }
    hideDialog(){
      this.enterEmailDialog = false ;
      this.email = ""
      this.submitted = false
      this.password =""
      this.password2=""
    }
    valider(email){
      this.submitted = true ;
      if(email != ""){
      this.candidatService.getCandidatByEmail(email).subscribe(data => {
this.cand = data ;
  this.submitted = false
  this.enterEmailDialog = false ;
this.verifierEmailDialog = true ;
this.submitted = false
}, err=>{
this.testEmail = false ;
  this.messageService.add({severity:'error', summary: 'Erreur', detail: "adresse Email inexistante", life: 3000});
}
      )
    }
  }

    envoyer(cand){
      this.messageService.add({severity:'success', summary:'Code de validation', detail: 'le code de confirmation est envoyer à votre e-mail', life: 3000});
      if(this.verifierCodeDialog == false )
      this.verifierCodeDialog = true ;
      this.candidatService.envoyerCodeCandidat(cand).subscribe(data =>{
this.codeValide = data
this.verifierEmailDialog = false;
this.submitted = false
      })
    }
    annuler(){
      this.email = ""
this.code = ""
this.password =""
this.password2=""
this.verifierCodeDialog = false ;
this.submitted = false

    }
    verifierCode(code){
      this.submitted = true
if(this.codeValide == code){
this.verifierCodeDialog = false ;
this.changePasswordDialog = true
this.submitted = false
    }
    else{
      this.confirmCode = false
      this.messageService.add({severity:'error', summary: 'Code Invalide', detail: "code invalide", life: 3000});
    }
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
      Retour(){
        this.email =""
        this.code =""
        this.changePasswordDialog = false ;
        this.submitted = false
      }
      ChangePassword(){
        this.submitted = true ;
        if(this.password && this.password2){
          this.cand.password = this.password ;
          this.candidatService.updateCandidatPass(this.cand).subscribe(data => {
            this.password =""
            this.password2=""
            this.Retour()
            this.messageService.add({severity:'success', summary: 'Votre mot de passe est changé', detail: " vous pouvez vous connecter avec le nouveau mot de passe", life: 3000});

          })
        }
      }

      test(){
        if(this.isError == false)
        this.messageService.add({severity:'error', summary: 'Erreur', detail: "adresse Email inexistante", life: 3000});
      }

  closing() {

  }
}
