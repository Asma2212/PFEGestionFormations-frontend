import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../../services/auth.service';
import {loginRequestPayload} from '../../../payload/login-request-payload';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

    loginForm: FormGroup;
    isError :boolean;

    loginRequestPayload: loginRequestPayload;

    constructor(private authService: AuthService ,private  router:Router) {


        this.loginRequestPayload = {
            username: '',
            email: '',
            password: ''
        };
    }

  ngOnInit(): void { $(document).ready(function(){
      $('#goRight').on('click', function(){
          $('#slideBox').animate({
              'marginLeft' : '0'
          });
          $('.topLayer').animate({
              'marginLeft' : '100%'
          });
      });
      $('#goLeft').on('click', function(){
          $('#slideBox').animate({
              'marginLeft' : '50%'
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


})}
  
    login() {
        console.log("username"+this.loginForm.get('username').value+"email"+this.loginForm.get('email').value+"email"+this.loginForm.get('password').value)

        this.loginRequestPayload.username = this.loginForm.get('username').value;
        this.loginRequestPayload.email = this.loginForm.get('email').value;
        this.loginRequestPayload.password = this.loginForm.get('password').value;
        this.authService.login(this.loginRequestPayload).subscribe(data => {
            console.log('Login successful');

                this.router.navigate(['/dashboard']);

        });
    }
        signup(){

        }
      
}
