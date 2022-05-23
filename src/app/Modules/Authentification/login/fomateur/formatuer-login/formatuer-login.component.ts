import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery.transit'
import {FormControl, FormGroup} from "@angular/forms";
import {loginRequestPayload} from '../../../payload/login-request-payload';
import {throwError} from "rxjs";
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

  constructor( private authService: AuthService, private router: Router,private toast:NgToastService,private dialog : MatDialog,private localStorage : LocalStorageService,private formateurService : FormateurService)
{
    this.loginRequestPayload = {
      username: '',
      email: '',
      password: ''
    };
  }
  ngOnInit(): void {
    if( $('.logoContainer').length){
    $(function() {

      var images = ['https://scontent.ftun16-1.fna.fbcdn.net/v/t1.6435-9/79696496_3527236330684677_4297932696039981056_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=b9115d&_nc_ohc=MUBNmTHI6PYAX-kIXCz&tn=svxw5LAQ1zZb89RM&_nc_ht=scontent.ftun16-1.fna&oh=00_AT81oIyWg3U9X8mMsq_0bF8P32Gga_OLYtHvpxoDsczEcw&oe=628A6F43', 'https://scontent.ftun16-1.fna.fbcdn.net/v/t1.6435-9/79696496_3527236330684677_4297932696039981056_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=b9115d&_nc_ohc=MUBNmTHI6PYAX-kIXCz&tn=svxw5LAQ1zZb89RM&_nc_ht=scontent.ftun16-1.fna&oh=00_AT81oIyWg3U9X8mMsq_0bF8P32Gga_OLYtHvpxoDsczEcw&oe=628A6F43', 'https://scontent.ftun16-1.fna.fbcdn.net/v/t1.6435-9/79696496_3527236330684677_4297932696039981056_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=b9115d&_nc_ohc=MUBNmTHI6PYAX-kIXCz&tn=svxw5LAQ1zZb89RM&_nc_ht=scontent.ftun16-1.fna&oh=00_AT81oIyWg3U9X8mMsq_0bF8P32Gga_OLYtHvpxoDsczEcw&oe=628A6F43', 'https://scontent.ftun16-1.fna.fbcdn.net/v/t1.6435-9/79696496_3527236330684677_4297932696039981056_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=b9115d&_nc_ohc=MUBNmTHI6PYAX-kIXCz&tn=svxw5LAQ1zZb89RM&_nc_ht=scontent.ftun16-1.fna&oh=00_AT81oIyWg3U9X8mMsq_0bF8P32Gga_OLYtHvpxoDsczEcw&oe=628A6F43'];

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
    console.log("username" + this.loginForm.get('username').value + "email" + this.loginForm.get('email').value + "password" + this.loginForm.get('password').value)

         console.log("gggggghere")
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.email = this.loginForm.get('email').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;
    this.authService.loginFormateur(this.loginRequestPayload).subscribe(data => {
      const username = this.localStorage.retrieve("username")
      this.formateurService.getFormateurByUsername(username).toPromise().then(d => {
        if(d.firstLogin)
        this.router.navigate(['/formateur/profil']);
        else
        this.router.navigate(['/firstLogin']);
      });
      console.log("dataaa",data)
      this.isError = false;


     /* else { this.isError = true;
        console.log("error in login method ")}*/

    }, error => {
      /*console.log("okey zoom in ")
      this.router.navigate(['/']);*/

      this.isError = true;
      this.toast.error({detail:"enter vos informations correctements !",duration:3000});

      /*
            this.errors=error.error.message;
      */

    });

  }

  complete(){
    this.dialog.open(NavBarComponent)
  }
  }




