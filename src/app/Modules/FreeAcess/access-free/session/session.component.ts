import {Component, OnInit, Self} from '@angular/core';
import * as $ from 'jquery'
import {SessionService} from "../../../../services/session.service";
import {Subscription} from "rxjs/Subscription";
import {sessionResponsePayload} from "../../../payload/session/session-response-payload";
import {ActivatedRoute} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {MatDialog} from "@angular/material/dialog";
import {CandidatRegisterComponent} from "../../../Authentification/login/candidat/candidat-register/candidat-register.component";
import {SessionFormation} from "../../../../models/SessionFormation";
import {LocalStorageService} from "ngx-webstorage";
import {ConfirmationService} from "primeng/api";
import { SessionFormationService } from 'app/services/SessionFormation.service';
import { data } from 'jquery';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  ListSessionOfCandidat : SessionFormation[];
  username1=this.localStorage.retrieve("username")
  checked1: boolean = false;

  checked2: boolean = true;
  inscrit:boolean = false ;
  val: number;
  private errors: any;
   session: SessionFormation;

  private id: number;

  constructor(private localStorage: LocalStorageService,public sessionService: SessionService,private route:ActivatedRoute,private toast:NgToastService,public dialog: MatDialog,private confirmationService: ConfirmationService,private sessionFormationService :SessionFormationService) {
  }

  ngOnInit(): void {

    this.id=this.route.snapshot.params['id']
    console.log("ID",this.id)
    this.val = 3;
   
    this.getbyIDSession(this.id)
    this.checkIfSessionInCandidat()
    

  }
  getbyIDSession(id:number){
    this.sessionService.getSession(id).toPromise().then(data => {
      
      this.session=data
      console.log("sessioon",this.session)

    }, error => {this.errors=error.error.message;})
  
  }
  

  handleToggle($event: any) {
  /*  if(localStorage.getItem("role")=="candidat"){   this.toast.success({detail:"clicked !",duration:3000});}
    else {*/
/*if( this.checked2) //true
   {
console.log("ggg"+$event.target.value)
      this.toast.error({detail:"checked1 !",duration:3000});}
else {      this.toast.success({detail:"checked2 !",duration:3000});
  console.log("bbbbb"+$event.target.value)

}*/
//checked2=false when clicked and checked1=true instead
    var isChecked = $event.checked;

console.log("herrere"+isChecked)

  }


  inscri() {
    // test local storage si oui
    var self = this;

    if (this.localStorage.retrieve("role")!=="candidat"){
      this.toast.error({detail:"il faut s'inscrire !",duration:3000});
      this.opnInscriptionDialog();
    return
    }
    else{
      const username=this.localStorage.retrieve("username")
      console.log("username"+username)
      const routeId=this.route.snapshot.params['id'];

      this.sessionService.getCandidaSession(username).toPromise().then(data => {
        this.ListSessionOfCandidat=data;
        console.log("list of sessions of a candidats"+this.ListSessionOfCandidat);
        this.ListSessionOfCandidat.forEach(function (value) {

          if (value.idSession==routeId){
            //console.log("the rout"+routeId)

            console.log("candiat already registred to the session ")
            self.toast.error({detail:"Échec!",summary:"candiat already registred to the session ",duration:3000});

            return ;
          }

          else {
            console.log("say hii")

            self.sessionService.ToInscrire(username,routeId).subscribe(data => {
              console.log("the data"+data);
              self.toast.success({detail:"success",summary:data.toString(),duration:3000});

              self.inscrit = true
            }),error => {
              self.toast.error({detail:"Échec!",summary:error.error.message,duration:3000});
            }

          }
        });
      })





    // sinon popup Vous devez vous connecter d'abord
  }
  }

/*  annuler() {
         this.sessionService.ToDesinscrire(this.username1,this.id).subscribe(data=>
         {  console.log(data+"hettetetett")
           this.toast.success({detail:"success",summary:data.toString(),duration:3000});

         })
    this.inscrit = false
  }*/
  confirm() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.sessionService.ToDesinscrire(this.username1,this.id).subscribe(data=>
        {  console.log(data+"hettetetett")
          this.toast.success({detail:"success",summary:data.toString(),duration:3000});

        })
        this.inscrit = false      }
    });
  }

  checkIfSessionInCandidat(){
    var nbSession:number;
    var listSession;
    var nombreMax;
    var dosentExist:boolean ;
    this.sessionService.getCandidaSession(this.username1).toPromise().then(data => {
  console.log("daaataaaaa",data)
      this.ListSessionOfCandidat=data;
      console.log("list of sessions of a candidats"+this.ListSessionOfCandidat);
      this.ListSessionOfCandidat.forEach(value => {

        if (value.idSession== this.id){

          this.inscrit = true
          nombreMax=value.nbMaxCandidat
          return ;

        }else{
          dosentExist=true

        }
        if(dosentExist){
          this.sessionFormationService.getSessions().toPromise().then(
            data=>{
               listSession=data ;
              console.log("list of sessions "+listSession);
            
              listSession.forEach(value =>{
  
               
              if(value.idSession==this.id){
                nbSession++ ;
              }
              })
              if(nbSession+1>this.session.nbMaxCandidat && this ){
                const input = document.getElementById('bt-inscrire') as HTMLInputElement | null;
                input?.setAttribute('disabled', '');

              }
            }
          )
  
          }
      })})

       

        
        // if(nbSession+1>this.session.nbMaxCandidat && this.ListSessionOfCandidat.){
        //   this.
        // }

  }
  private opnInscriptionDialog() {
    const dialogRef = this.dialog.open(CandidatRegisterComponent)
  }
}
