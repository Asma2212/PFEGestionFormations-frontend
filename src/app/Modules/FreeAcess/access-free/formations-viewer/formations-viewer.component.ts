import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'app/models/Categorie';
import { Formation } from 'app/models/Formation';
import { NivDifficulteEnum } from 'app/models/NivDifficulteEnum';
import { SessionFormation } from 'app/models/SessionFormation';
import { CategorieService } from 'app/services/categorie.service';
import { SessionFormationService } from 'app/services/SessionFormation.service';
import { UploadFileService } from 'app/services/upload-file.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import {LocalStorageService} from "ngx-webstorage";
import {SessionService} from "../../../../services/session.service";
import {NgToastService} from "ng-angular-popup";
import {CandidatRegisterComponent} from "../../../Authentification/login/candidat/candidat-register/candidat-register.component";
import {MatDialog} from "@angular/material/dialog";
import {data} from "jquery";

@Component({
  selector: 'app-formations-viewer',
  templateUrl: './formations-viewer.component.html',
  styleUrls: ['./formations-viewer.component.scss']
})
export class FormationsViewerComponent implements OnInit {
  favoris: boolean;

  filterDateDeb: Date;
  filterDateFin: Date;
  submitFilterDate: boolean = false;

  savedSe: Map<SessionFormation, boolean> = new Map();
  categorieFilter: Categorie;
  filt: boolean = false;
  saveF: boolean = false;
  savedSessions: SessionFormation;
  sessions: SessionFormation[];
  filterSessions: SessionFormation[];
  cat: Categorie[];
  f: Formation;
  fileInfos: Observable<any>;


// counter
  nouvCours: number = 0;
  archive: number = 0;
  OuvertInscrit: number = 0;
  enCours: number = 0;
  aVenir: number = 0;
  toutCours: number = 0;

  titreF: string;

  nouvCoursCheck: any;
  archiveCheck: any;
  ouvertInscritCheck: any;
  enCoursCheck: any;
  aVenirCheck: any;
  /*
  eya
   */
  ListSessionOfCandidat: SessionFormation[];
  username1 = this.localStorage.retrieve("username")

  nbSessG: number;
  maxG: number;

  inscrit: boolean
  val: number;
  private errors: any;
  session: SessionFormation;
  dosentExist: boolean;

  disabled: any;

  /*
  /end
   */
  constructor(public localStorage: LocalStorageService, private sessionservice: SessionService, private toast: NgToastService, public datepipe: DatePipe, public dialog: MatDialog, private router: Router, private sessionService: SessionFormationService, private categorieService: CategorieService, private uploadService: UploadFileService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    /**    if(localStorage.getItem("formationSaved")){
      this.savedSe = JSON.parse(localStorage.getItem("formationSaved"))
      } */

    this.sessionService.getSessions().toPromise().then(data => {
      this.sessions = data
      this.filterSessions = this.sessions;
      this.toutCours = this.sessions.length;
      this.sessions.forEach(s => {
        if (new Date(s.dateDebSession) > new Date())
          this.nouvCours++;
        if (new Date(s.dateFinSession) < new Date())
          this.archive++;
        if (s.listeCandidat.length < s.nbMaxCandidat)
          this.OuvertInscrit++;
        if ((new Date() >= new Date(s.dateDebSession)) && (new Date() <= new Date(s.dateFinSession)))
          this.enCours++;
        if (new Date(s.dateDebSession) > new Date())
          this.aVenir++;
      });
    });
    this.categorieService.getAllCategories().toPromise().then(data => {
      this.cat = data;
      console.log("everthing is okay geet categorie", data)
    });
    this.fileInfos = this.uploadService.getFiles();

    const wrapper = document.querySelector(".wrapper");
    const header = document.querySelector(".header");

    /*
        wrapper.addEventListener("scroll", (e) => {
          e.target.scrollTop > 30
            ? header.classList.add("header-shadow")
            : header.classList.remove("header-shadow");
        });
    */

    const toggleButton = document.querySelector(".dark-light");

  /*  toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });*/

    const jobCards = document.querySelectorAll(".job-card");
    const logo = document.querySelector(".logo");
    const jobLogos = document.querySelector(".job-logos");
    const jobDetailTitle = document.querySelector(
      ".job-explain-content .job-card-title"
    );
    var jobBg = document.querySelector(".job-bg") as HTMLElement;

    jobCards.forEach((jobCard) => {
      jobCard.addEventListener("click", () => {
        const number = Math.floor(Math.random() * 10);
        const url = `https://unsplash.it/640/425?image=${number}`;
        /*
                jobBg.src = url;
        */

        const logo = jobCard.querySelector("svg");
        const bg = logo.style.backgroundColor;
        console.log(bg);
        jobBg.style.background = bg;
        const title = jobCard.querySelector(".job-card-title");
        jobDetailTitle.textContent = title.textContent;
        jobLogos.innerHTML = logo.outerHTML;
        wrapper.classList.add("detail-page");
        wrapper.scrollTop = 0;
      });
    });

    logo.addEventListener("click", () => {
      wrapper.classList.remove("detail-page");
      wrapper.scrollTop = 0;
      /*
            jobBg.style.background = bg;
      */
    });


    /* button s'inscrire

     */
    //this.inscrit = false;

    /*
    end button s'inscrire
     */

this.checkFavorit("15915915",83)
  }

  checkFavorit(username:string,sessionId:number):boolean{
    this.sessionservice.ListFavoris(username).toPromise().then(data=>{
      data.forEach(obj=>{
        if (obj.idSession==sessionId){
          this.favoris=true ;
          console.log("euhsgjhwsvhwsg",obj)
          console.log("f",this.favoris)
         return true
        }
/*        else {
          this.favoris=false ;
return false ;
        }*/
      })

      },error=>{
      this.toast.error({detail: "errorfd", duration: 3000});
      }
    )
    console.log("fxxx",this.favoris)

    return false

  }
  testImage(t: string) {
    return t.includes("image");
  }

  func() {
    if (this.filt == false)
      this.filt = true
    else
      this.filt = false

  }

  testSession(session) {
    if ((this.savedSe) && (this.savedSe.get(session) == true))
      return true

    return false
  }

  saveFormation(session) {
    /*this.savedSe.set(session, true)
    console.log(this.savedSe)
    // localStorage.setItem("formationSaved", JSON.stringify(this.savedSe.keys()));
    // add to candidat saved session*/


  }

  deleteFormation(session) {
    this.savedSe.delete(session)
    //  localStorage.setItem("formationSaved", JSON.stringify(this.savedSe.entries()));

  }

/**
  filterParDate() {
    console.log("sess", this.sessions)
    this.submitFilterDate = true;
    console.log(this.filterDateDeb, this.filterDateFin)
    if (this.filterDateDeb && this.filterDateFin) {
      this.sessions = this.filterSessions.filter(s =>
        this.filterDateDeb <= new Date(s.dateDebSession) && new Date(s.dateFinSession) <= this.filterDateFin
      );
      // this.sessions = this.
      console.log("filter", this.sessions)
    } else if (this.filterDateDeb) {
      this.sessions = this.filterSessions.filter(s =>
        new Date(s.dateDebSession) >= this.filterDateDeb
      );

    } else if (this.filterDateFin) {
      this.sessions = this.filterSessions.filter(s =>
        new Date(s.dateFinSession) <= this.filterDateFin
      );
    }
    if (this.sessions.length == 0) {
      this.sessions = this.filterSessions
      console.log("aucune formation")
    }
  }

  filtreParTitre() {
    if (this.titreF === '') {
      this.sessions = this.filterSessions;
    } else {
      let filterValueLower = this.titreF.toLowerCase();
      this.sessions = this.filterSessions.filter(s => s.titreSession.toLowerCase().includes(filterValueLower)); //|| s.descriptionSession.toLowerCase().includes(filterValue)
    }
  }

  filtreParCategorie() {
    console.log(this.categorieFilter)
    if (this.categorieFilter[0] == null) {
      this.sessions = this.filterSessions;
    } else {
      this.sessions = this.filterSessions.filter(s =>
        s.formationSession.listCategories.find(c => c.id === this.categorieFilter[0].id)
      ); //|| s.descriptionSession.toLowerCase().includes(filterValue)
      console.log(this.sessions)
    }

  } */

  filterChange() {
    this.sessions = this.filterSessions
    if (this.titreF) {
      let filterValueLower = this.titreF.toLowerCase();
      this.sessions = this.sessions.filter(s => s.titreSession.toLowerCase().includes(filterValueLower)); //|| s.descriptionSession.toLowerCase().includes(filterValue)
    }

    if (this.filterDateDeb || this.filterDateFin) {
      this.submitFilterDate = true;
      console.log(this.filterDateDeb, this.filterDateFin)
      if (this.filterDateDeb && this.filterDateFin) {
        this.sessions = this.sessions.filter(s =>
          this.testDate(s.dateDebSession, s.dateFinSession)
        );
        // this.sessions = this.
        console.log("filter", this.sessions)
      } else if (this.filterDateDeb) {
        this.sessions = this.sessions.filter(s =>
          new Date(s.dateDebSession) >= this.filterDateDeb
        );

      } else if (this.filterDateFin) {
        this.sessions = this.sessions.filter(s =>
          new Date(s.dateFinSession) <= this.filterDateFin
        );
      }
    }


    if (this.categorieFilter) {
      this.sessions = this.sessions.filter(s =>
        s.formationSession.listCategories.find(c => c.id === this.categorieFilter[0].id)
      );

    }

    //*****checkbox filter :
    console.log("==", this.archiveCheck)
    console.log(this.nouvCoursCheck)
    if (this.nouvCoursCheck == true) {
      this.sessions = this.sessions.filter(s =>
        new Date(s.dateDebSession) > new Date()
      );
    }
    if (this.archiveCheck == true) {
      console.log(this.archiveCheck)
      this.sessions = this.sessions.filter(s =>
        new Date(s.dateFinSession) < new Date()
      );
    }
    if (this.ouvertInscritCheck == true) {
      this.sessions = this.sessions.filter(s =>
        s.listeCandidat.length < s.nbMaxCandidat
      );
    }
    if (this.enCoursCheck == true) {
      this.sessions = this.sessions.filter(s =>
        (new Date() >= new Date(s.dateDebSession)) && (new Date() <= new Date(s.dateFinSession))
      );
    }
    if (this.aVenirCheck == true) {
      this.sessions = this.sessions.filter(s =>
        new Date(s.dateDebSession) > new Date()
      );
    }
    if (this.sessions.length == 0) {
      this.messageService.add({severity: 'warn', summary: 'Vide', detail: 'aucune Formation trouvée', life: 3000});
    }


  }

  testDate(dateDeb: Date, dateFin: Date) {
    dateDeb = new Date(dateDeb);
    dateDeb.setHours(0, 0, 0, 0);
    dateFin = new Date(dateFin);
    dateFin.setHours(0, 0, 0, 0);

    return this.filterDateDeb <= dateDeb && dateFin <= this.filterDateFin

  }

  nbCandidat(session: SessionFormation) {
    if (session.nbMaxCandidat == session.listeCandidat.length)
      return true

    return false
  }

  detailSession(session: SessionFormation) {
    this.router.navigateByUrl('home/session/' + session.idSession);
  }

  clearDateFilter() {
    this.submitFilterDate = false;
    this.filterDateDeb = null;
    this.filterDateFin = null;
    this.filterChange();
  }


  /*
  eya
   */

  checkNmbMax(id: number) {
    var nbSession = 0;
    var listofCandidats;
    var i = 0;
    this.sessionservice.getSession(id).toPromise().then(
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
          /* this.disabled=true*/
          return true


        }
      }
    )

  }

  checkIfSessionInCandidat(id: number) {
    this.sessionservice.getSession(id).toPromise().then(data => {
      console.log("java date" + data.dateFinSession)
      const now = this.datepipe.transform(new Date(), 'yyyy-MM-dd')

      const nowDate = new Date(now)
      const dateFinSessionDate = new Date(this.datepipe.transform(data.dateFinSession, 'yyyy-MM-dd'))
      console.log("todaayyy", now)
      console.log("if true or false", data.dateFinSession < nowDate, "the ending of session", dateFinSessionDate, "today", nowDate)
      if (dateFinSessionDate < nowDate) {
        //this.disabled=true
        console.log("subscription is closeddddd");
        return true
      }
    })
    ;

    //tchouf kén il condidat inscrit lil session lil button annullé
    if (this.localStorage.retrieve("role") == "candidat") {
      this.sessionservice.getCandidaSession(this.username1).toPromise().then(data => {
        //console.log("daaataaaaa",data)
        this.ListSessionOfCandidat = data;
        // console.log("daaataaaaa8888",this.ListSessionOfCandidat)
        console.log("list of sessions of a candidats" + this.ListSessionOfCandidat);
        if (this.ListSessionOfCandidat.length == 0) {
          console.log("empty array of sessions inside a candidat")
          this.checkNmbMax(id);
          return;
        }
        this.ListSessionOfCandidat.forEach(value => {

          if (value.idSession == id) {


            this.inscrit = true
            //nombreMax=value.nbMaxCandidat
            return;

          } else {
            //chouf kén nombre max wsilnélou
            //this.dosentExist = true
            this.checkNmbMax(id);

          }
        })
      })
    }


    // if(nbSession+1>this.session.nbMaxCandidat && this.ListSessionOfCandidat.){
    //   this.
    // }

  }

  inscri(id: number) {
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
      this.sessionservice.getSession(id).toPromise().then(
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


            this.sessionservice.getCandidaSession(username).toPromise().then(data => {
              this.ListSessionOfCandidat = data;
              console.log("list of sessions of a candidats" + this.ListSessionOfCandidat);
              if (this.ListSessionOfCandidat.length == 0) {
                console.log("say hii")

                self.sessionservice.ToInscrire(username, id).subscribe(data => {
                  console.log("xxxxx " + data);
                  self.toast.success({detail: "success", summary: data.toString(), duration: 3000});

                  self.inscrit = true
                }), error => {
                  self.toast.error({detail: "Échec!", summary: error.error.message, duration: 3000});
                }
              }
              this.ListSessionOfCandidat.forEach(function (value) {

                if (value.idSession == id) {


                  console.log("candiat already registred to the session ")
                  self.toast.error({
                    detail: "Échec!",
                    summary: "candiat already registred to the session ",
                    duration: 3000
                  });

                  return;
                } else {
                  console.log("say hii")

                  self.sessionservice.ToInscrire(username, id).subscribe(data => {
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

  private opnInscriptionDialog() {
    const dialogRef = this.dialog.open(CandidatRegisterComponent)
  }

  funcTest(dateFinSession: Date, length: number, nbMaxCandidat: number) {
console.log("id",length,nbMaxCandidat,length+1 == nbMaxCandidat)
    return ((length >= nbMaxCandidat)||(new Date(dateFinSession) < new Date()))
  }


/*
/eya
 */
/*  funcTest(dateFinSession: Date,idSession:number) {
    var nbSession=0;
    var listofCandidats;
    var i=0 ;
    var res:boolean=false
    this.sessionservice.getSession(idSession).toPromise().then(
      data => {   listofCandidats = data.listeCandidat;
        console.log("list of candidats" + listofCandidats);
        if(listofCandidats.length==0){
          console.log("0 candidats in this session");
        }  else {
          console.log("i am here")
          listofCandidats.forEach(value => {
            console.log("candidat number" + (i + 1), value)


            nbSession++; //nis7sbou 9adéh 3andna min candidats fi sessions ili éna féha

          })
          console.log("nombre de candidats qui son't inscrit dans cette session" ,nbSession)
        }if (nbSession + 1 > data.nbMaxCandidat ) {
          console.log("its full u can't register no more")
          /!*const input = document.getElementById('bt-inscrire') as HTMLInputElement | null;
          input?.setAttribute('disabled', '');*!/
          return



        }})
    return (
      (new Date(dateFinSession)
      ))
  }*/
  saveFormation1(idSession: number, username: any) {
    this.sessionservice.ToFavoris(username,idSession).subscribe(data=>{
      console.log("ok")
    },error => {
      console.log(error);
    })

  }

  deleteFormation1(idSession: number, retrieve: any) {

  }
}
