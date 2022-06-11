import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery.transit'
import {FormControl, FormGroup} from "@angular/forms";
import {loginRequestPayload} from '../../../payload/login-request-payload';
import {Observable, throwError} from "rxjs";
import {AuthService} from "../../../../../services/auth.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ToastrService} from "ngx-toastr";
import {TooltipModule} from 'primeng/tooltip';
import {NgToastService} from "ng-angular-popup";
import { NavBarComponent } from 'app/Modules/FreeAcess/access-free/nav-bar/nav-bar.component';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from 'ngx-webstorage';
import { FormateurService } from 'app/services/formateur.service';
import { Formateur } from 'app/models/Formateur';
import { UploadFileService } from 'app/services/upload-file.service';

@Component({
  selector: 'app-formatuer-login',
  templateUrl: './formatuer-login.component.html',
  styleUrls: ['./formatuer-login.component.scss']
})
export class FormatuerLoginComponent implements OnInit {
  loginForm: FormGroup;
  isError: boolean;
  loginRequestPayload: loginRequestPayload;
  validateEmail = true;
  private errors: string ;
  enterEmailDialog : boolean = false ;
  email : string = "";
  forma : Formateur ;
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
  fileInfos: Observable<any>;

  constructor( private authService: AuthService, private router: Router,private toast:NgToastService,private dialog : MatDialog,private localStorage : LocalStorageService,private formateurService : FormateurService,private messageService : MessageService,private uploadService : UploadFileService)
{
    this.loginRequestPayload = {
      username: '',
      email: '',
      password: ''
    };
  }
  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
    if( $('.logoContainer').length){
    $(function() {

      var images = ['../../../../../../assets/img/formateurBackground.jpg', '../../../../../../assets/img/formateurBackground.jpg', '../../../../../../assets/img/formateurBackground.jpg'];

      $('#container').append('<style>#container, .acceptContainer:before, #logoContainer:before {background: url(' + images[Math.floor(Math.random() * images.length)] + ') center fixed }');




      setTimeout(function() {
        $('.logoContainer').transition({scale: 1}, 700, 'ease');
        setTimeout(function() {
          $('.logoContainer .logo').addClass('loadIn');
          setTimeout(function() {
            $('.logoContainer .text').addClass('loadIn');
            setTimeout(function() {
              $('.acceptContainer').transition({height: '431.5px'});
              setTimeout(function() {
                $('.acceptContainer').addClass('loadIn');
                setTimeout(function() {
                  $('.formDiv, form h1').addClass('loadIn');
                }, 500)
              }, 500)
            }, 500)
          }, 500)
        }, 1000)
      }, 10)

    });
      /*******************************************************/
      this.loginForm = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
        email: new FormControl(''),})}


  }
  login() {
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.email = this.loginForm.get('email').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;
    this.authService.loginFormateur(this.loginRequestPayload).subscribe(data => {
      const username = this.localStorage.retrieve("username")
      this.formateurService.getFormateurByUsername(username).subscribe(d => {
        if(d.firstLogin)
        this.router.navigate(['/formateur/profil']);
        else
        this.router.navigate(['/firstLogin/profil']);
      });

      this.isError = false;


     /* else { this.isError = true;
        console.log("error in login method ")}*/

    }, error => {
      /*console.log("okey zoom in ")
      this.router.navigate(['/']);*/

      this.isError = true;
      this.toast.error({detail:"entrer vos informations correctement !",duration:3000});

      /*
            this.errors=error.error.message;
      */

    });

  }

  complete(){
    this.dialog.open(NavBarComponent)
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
    this.formateurService.getFormateurByEmail(email).subscribe(data => {
this.forma = data ;
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

  envoyer(forma){
    this.messageService.add({severity:'success', summary:'Code de validation', detail: 'le code de confirmation est envoyer à votre e-mail', life: 3000});
    if(this.verifierCodeDialog == false )
    this.verifierCodeDialog = true ;
    this.formateurService.envoyerCodeFormateur(forma).subscribe(data =>{
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
        this.forma.password = this.password ;
        this.formateurService.updateFormateur(this.forma).subscribe(data => {
          this.password =""
          this.password2=""
          this.Retour()
          this.messageService.add({severity:'success', summary: 'Votre mot de passe est changé', detail: " vous pouvez vous connecter avec le nouveau mot de passe", life: 3000});

        })
      }
    }
    testImage(t : string){
      return t.includes("image") ;
    }
  }




