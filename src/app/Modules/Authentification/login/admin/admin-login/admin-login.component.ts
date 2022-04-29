import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../../services/auth.service';
import {loginRequestPayload} from '../../../payload/login-request-payload';
import {Router} from '@angular/router';
import {MessageService} from "primeng/api";
import {throwError} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  loginForm: FormGroup;
  signupForm: FormGroup;
  isError: boolean;
  isError_signup: boolean;

  loginRequestPayload: loginRequestPayload;
  validateEmail = true;
  private errors: string ;


  constructor(private authService: AuthService, private router: Router, private messageService: MessageService, private toastr: ToastrService) {


    this.loginRequestPayload = {
      username: '',
      email: '',
      password: ''
    };

  }

  ngOnInit(): void {
    $(document).ready(function () {
      $('#goRight').on('click', function () {
        $('#slideBox').animate({
          'marginLeft': '0'
        });
        $('.topLayer').animate({
          'marginLeft': '100%'
        });
      });
      $('#goLeft').on('click', function () {
        $('#slideBox').animate({
          'marginLeft': '50%'
        });
        $('.topLayer').animate({
          'marginLeft': '0'
        });
      });
    });
    /*******************************************************/
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl(''),


    })
    this.signupForm=new FormGroup({
      username_signup:new FormControl(''),
      password_signup: new FormControl(''),
      email_signup : new FormControl(''),
    })
  }

  login() {
    console.log("username" + this.loginForm.get('username').value + "email" + this.loginForm.get('email').value + "password" + this.loginForm.get('password').value)


    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.email = this.loginForm.get('email').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;
    this.authService.login(this.loginRequestPayload).subscribe(data => {
      this.isError = false;
      this.router.navigate(['/dashboard']);

    }, error => {
      this.isError = true;
      throwError(error);
      this.errors=error.error.message;

    });

  }

  signup() {
    console.log("username" + this.signupForm.get('username_signup').value + "email" + this.signupForm.get('email_signup').value + "password_signup" + this.signupForm.get('password_signup').value)


    this.loginRequestPayload.username = this.signupForm.get('username_signup').value;
    this.loginRequestPayload.email = this.signupForm.get('email_signup').value;
    this.loginRequestPayload.password = this.signupForm.get('password_signup').value;
    this.authService.signup(this.loginRequestPayload).subscribe(data => {
      this.isError_signup= false;
      this.router.navigate(['/login/admin']);

    }, error => {
      console.log(error)
      this.isError_signup = true;
      throwError(error);
      this.errors=error.error.message;
    });

  }

}
