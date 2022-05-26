import {Component, OnInit, Self, ViewEncapsulation} from '@angular/core';
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
import {SessionFormationService} from 'app/services/SessionFormation.service';
import {data} from 'jquery';
import {DatePipe} from "@angular/common";
import { Observable } from 'rxjs';
import { UploadFileService } from 'app/services/upload-file.service';
import {FormationService} from "../../../../services/formation.service";
import {CandidatService} from "../../../../services/candidat.service";

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class SessionComponent implements OnInit {

  ListSessionOfCandidat: SessionFormation[];
  username1 = this.localStorage.retrieve("username")
  checked1: boolean;
  nbSessG: number;
  maxG: number;
  checked2: boolean
  inscrit: boolean
  val: number;
  private errors: any;
  session: SessionFormation;
  dosentExist: boolean;
  private id: number;
  disabled: any;
  fileInfos: Observable<any>
   nInscriCandidat: number;
   numberOfSessionInFormation: number;
   AllCandidats: number;


  constructor(private localStorage: LocalStorageService,
              private  candidatService:CandidatService,
              public sessionService: SessionService, private route: ActivatedRoute, private toast: NgToastService, public dialog: MatDialog, private confirmationService: ConfirmationService, private sessionFormationService: SessionFormationService, private formationService :FormationService,public datepipe: DatePipe, private uploadService: UploadFileService) {
  }

  ngOnInit(): void {
    this.checked1 = true;
    this.checked2 = true;
    this.inscrit = false;
    this.id = this.route.snapshot.params['id']
    console.log("ID", this.id)
    this.val = 3;
    this.getbyIDSession(this.id)
    this.checkIfSessionInCandidat()
    this.fileInfos = this.uploadService.getFiles();


    this.showGlobalRating();
    this.numberOfCandidats();
    this.nomberOfCandidats();

  }

  getbyIDSession(id: number) {
    this.sessionService.getSession(id).subscribe(data => {
      console.log("Message", data)
      this.session = data


    }, error => {
      this.errors = error.error.message;
    })

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

    console.log("herrere" + isChecked)

  }


  checkNmbMax1(): boolean {
    var nbSession = 0;
    var listofCandidats;
    var i = 0;
    this.sessionService.getSession(this.id).subscribe(
      data => {
        listofCandidats = data.listeCandidat;
        console.log("list of candidats" + listofCandidats);
        if (listofCandidats.length == 0) {
          console.log("0 candidats in this session");
        } else {
          console.log("i am here")
          nbSession = listofCandidats.length;
          console.log("nombre de candidats qui son't inscrit dans cette session", nbSession)


          if (nbSession + 1 > data.nbMaxCandidat) {
            console.log("its full u can't register no more")
            /*const input = document.getElementById('bt-inscrire') as HTMLInputElement | null;
            input?.setAttribute('disabled', '');*/
            this.disabled = true
            console.log("uuu");
            // this.toast.error({detail: "Échec!", summary:"errooorrr", duration: 3000})
            return true;

          }
          // return false ;
        }
      }
    )
    return false;
  }

  checkNmbMax() {
    var nbSession = 0;
    var listofCandidats;
    var i = 0;
    this.sessionService.getSession(this.id).subscribe(
      data => {
        listofCandidats = data.listeCandidat;
        console.log("list of candidats" + listofCandidats);
        if (listofCandidats.length == 0) {
          console.log("0 candidats in this session");
        } else {
          console.log("i am here")

          nbSession = listofCandidats.length;
          console.log("nombre de candidats qui son't inscrit dans cette session", nbSession)

          if (nbSession + 1 > data.nbMaxCandidat) {
            console.log("its full u can't register no more")
            /*const input = document.getElementById('bt-inscrire') as HTMLInputElement | null;
            input?.setAttribute('disabled', '');*/
            this.disabled = true


          }
        }
      }
    )

  }


  inscri() {
    //var nombreMax;

    // test local storage si oui
    var self = this;
    //si il n'est pas  authetifier
    if (this.localStorage.retrieve("role") !== "candidat") {
      this.toast.error({detail: "il faut s'inscrire !", duration: 3000});
      this.opnInscriptionDialog();
      return
    }
    //si il est authentifier
    else {


      var nbSession = 0;
      var listofCandidats;
      var i = 0;
      this.sessionService.getSession(this.id).subscribe(
        data => {
          listofCandidats = data.listeCandidat;
          console.log("list of candidats" + listofCandidats);
          if (listofCandidats.length == 0) {
            console.log("0 candidats in this session");
          } else {
            console.log("i am here")
            listofCandidats.forEach(value => {
              console.log("candidat number" + (i + 1), value)


              nbSession++; //nis7sbou 9adéh 3andna min candidats fi sessions ili éna féha

            })
            console.log("nombre de candidats qui son't inscrit dans cette session", nbSession)
          }

          if (nbSession + 1 > data.nbMaxCandidat) {
            console.log("its full u can't register no more")
            /*const input = document.getElementById('bt-inscrire') as HTMLInputElement | null;
            input?.setAttribute('disabled', '');*/
            //this.disabled = true
            console.log("uuu");
            this.toast.error({detail: "Échec!", summary: "errooorrr", duration: 3000})
            return true;

          } else {
            const username = this.localStorage.retrieve("username")
            console.log("username" + username)
            const routeId = this.route.snapshot.params['id'];

            this.sessionService.getCandidaSession(username).subscribe(data => {
              this.ListSessionOfCandidat = data;
              console.log("list of sessions of a candidats" + this.ListSessionOfCandidat);
              if (this.ListSessionOfCandidat.length == 0) {
                console.log("say hii")

                self.sessionService.ToInscrire(username, routeId).subscribe(data => {
                  console.log("xxxxx " + data);
                  self.toast.success({detail: "success", summary: data.toString(), duration: 3000});

                  self.inscrit = true
                }), error => {
                  self.toast.error({detail: "Échec!", summary: error.error.message, duration: 3000});
                }
              }
              this.ListSessionOfCandidat.forEach(function (value) {

                if (value.idSession == routeId) {
                  //console.log("the rout"+routeId)

                  console.log("candiat already registred to the session ")
                  self.toast.error({
                    detail: "Échec!",
                    summary: "candiat already registred to the session ",
                    duration: 3000
                  });

                  return;
                } else { //kén mich registered {

                  //kén il nombre maykaffich
                  /*
                              if (this.dosentExist) {
                                this.sessionFormationService.getSessions().subscribe(
                                  data => {
                                    listSession = data;
                                    console.log("list of sessions " + listSession);

                                    listSession.forEach(value => {


                                      if (value.idSession == this.id) {
                                        nbSession++;
                                      }
                                    })
                                    if (nbSession + 1 > this.session.nbMaxCandidat && this) {
                                      const input = document.getElementById('bt-inscrire') as HTMLInputElement | null;
                                      input?.setAttribute('disabled', '');

                                    }
                                  }
                                )

                              }
                  */

                  //
                  console.log("say hii")

                  self.sessionService.ToInscrire(username, routeId).subscribe(data => {
                    console.log("the data" + data);
                    self.toast.success({detail: "success", summary: data.toString(), duration: 3000});

                    self.inscrit = true
                  }), error => {
                    self.toast.error({detail: "Échec!", summary: error.error.message, duration: 3000});
                  }

                }
              });
            })


            // sinon popup Vous devez vous connecter d'abord
          }
          // return false ;
        }
      )
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
        this.sessionService.ToDesinscrire(this.username1, this.id).subscribe(data => {
          console.log(data + "hettetetett")
          this.toast.success({detail: "success", summary: data.toString(), duration: 3000});

        })
        this.inscrit = false
        // location.reload();
        // this.ngOnInit()

      }
    });
  }

  checkIfSessionInCandidat() {
    this.sessionService.getSession(this.id).subscribe(data => {
      console.log("java date" + data.dateFinSession)
      const now = this.datepipe.transform(new Date(), 'yyyy-MM-dd')

      const nowDate = new Date(now)
      const dateFinSessionDate = new Date(this.datepipe.transform(data.dateFinSession, 'yyyy-MM-dd'))
      console.log("todaayyy", now)
      console.log("if true or false", data.dateFinSession < nowDate, "the ending of session", dateFinSessionDate, "today", nowDate)
      if (dateFinSessionDate < nowDate) {
        this.disabled = true
        console.log("subscription is closeddddd");
        return;
      }
    })
    ;

    //tchouf kén il condidat inscrit lil session lil button annullé
    if (this.localStorage.retrieve("role") == "candidat") {
      this.sessionService.getCandidaSession(this.username1).subscribe(data => {
        //console.log("daaataaaaa",data)
        this.ListSessionOfCandidat = data;
        // console.log("daaataaaaa8888",this.ListSessionOfCandidat)
        console.log("list of sessions of a candidats" + this.ListSessionOfCandidat);
        if (this.ListSessionOfCandidat.length == 0) {
          console.log("empty array of sessions inside a candidat")
          this.checkNmbMax();
          return;
        }
        this.ListSessionOfCandidat.forEach(value => {

          if (value.idSession == this.id) {


            this.inscrit = true
            //nombreMax=value.nbMaxCandidat
            return;

          } else {
            //chouf kén nombre max wsilnélou
            //this.dosentExist = true
            this.checkNmbMax();

          }
        })
      })
    }


    // if(nbSession+1>this.session.nbMaxCandidat && this.ListSessionOfCandidat.){
    //   this.
    // }

  }

  private opnInscriptionDialog() {
    const dialogRef = this.dialog.open(CandidatRegisterComponent)
  }

  testImage(t: string) {
    return t.includes("image");
  }


  /***
   * rating
   */
  score:number ;
  hideboolean=false;

  showGlobalRating(){this.sessionService.showGlobalRating(this.id).subscribe(
    data=>{
  this.score=data;}
,error => {console.log(error)}
)
}

  hide() {
this.hideboolean=true;
  }
  /**
   * number of candidats
   */
  numberOfCandidats(){
    this.sessionService.getSession(this.id).subscribe(data=>
    {this.numberOfSessions(data.formationSession.idFormation)
      this.nInscriCandidat=data.listeCandidat.length ;
    })
  }
  numberOfSessions(id:number){
    this.formationService.getAllSessionsOfFormation(id).subscribe(data=>{

      this.numberOfSessionInFormation=data.length
    },
      error => {console.log(error)})
  }
  nomberOfCandidats(){
    this.candidatService. getAllCandidats().subscribe(data=>

    {
      this.AllCandidats=data.length;
    })

  }
}
