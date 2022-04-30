import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../../../../services/auth.service";
import {Router} from "@angular/router";
import {MessageService, SelectItem, SelectItemGroup} from "primeng/api";
import {ToastrService} from "ngx-toastr";
import {throwError} from "rxjs";
import {loginRequestPayload} from "../../../payload/login-request-payload";
import {CandidatRequestSignupPayload} from "../../../payload/CandidatRequestSignupPayload";
import {PasswordModule} from 'primeng/password';
import {Department} from "../../../../../models/Departement";
import {Classe} from "../../../../../models/Classe";
import {DepartementService} from "../../../../../services/departement.service";

@Component({
  selector: 'app-candidat-register',
  templateUrl: './candidat-register.component.html',
  styleUrls: ['./candidat-register.component.scss']
})
export class CandidatRegisterComponent implements OnInit {


  loginForm: FormGroup;
  signupForm: FormGroup;
  isError: boolean;
  isError_signup: boolean;

  loginRequestPayload: CandidatRequestSignupPayload;
  validateEmail = true;
  private errors: string;
  minDate: Date;
  maxDate: Date;
  listDep : Department[];
  listD : Department[];
  listC : Classe ;
  d: Department ;
  c:Classe ;
  listClass : Classe[];
  depItem : SelectItemGroup ;
  classItem : SelectItem ;
  listclass : SelectItem[];

  depSelected : boolean = false ;
  constructor(private authService: AuthService, private router: Router, private messageService: MessageService, private toastr: ToastrService,private departementService : DepartementService) {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 50, 0, 1);
    this.maxDate = new Date(currentYear -10, 11, 31);

    this.loginRequestPayload = {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateNaiss: null,
      genre: '',
      department: null,
      classe: null,

    };

  }

  ngOnInit(): void {
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
      repassword : new FormControl(''),
      genre : new  FormControl(''),
      //listD : new  FormControl('')
    })
    this.departementService.getAllDepartements().toPromise().then( data =>{
      this.listDep = data ;
      console.log("departement :",data) });
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
      this.errors = error.error.message;

    });

  }

  signup() {
    console.log("username" + this.signupForm.get('username_signup').value + "email" + this.signupForm.get('email_signup').value + "password_signup" + this.signupForm.get('password_signup').value)


    this.loginRequestPayload.username = this.signupForm.get('username_signup').value;
    this.loginRequestPayload.email = this.signupForm.get('email_signup').value;
    this.loginRequestPayload.password = this.signupForm.get('password_signup').value;
    this.authService.signup(this.loginRequestPayload).subscribe(data => {
      this.isError_signup = false;
      this.router.navigate(['/login/admin']);

    }, error => {
      console.log(error)
      this.isError_signup = true;
      throwError(error);
      this.errors = error.error.message;
    });

  }
  departementSelected(dep){
    if(dep){
      this.d = dep[0];
      console.log("hhheeey",this.d);
      //console.log("cc",this.candidat.department.id);
      this.depSelected = true ;
      this.listClass = dep[0].classes ;
      // this.candidat.department = dep[0];
    }}

  classeSelected(classe : Classe){
    if(classe){
      console.log("classssseeee",classe[0].name);
      this.c = classe[0];
      //console.log("cc",this.candidat.department.id);
      // this.candidat.classe = classe[0];
    }}

}
