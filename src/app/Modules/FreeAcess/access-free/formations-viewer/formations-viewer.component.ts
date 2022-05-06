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

@Component({
  selector: 'app-formations-viewer',
  templateUrl: './formations-viewer.component.html',
  styleUrls: ['./formations-viewer.component.scss']
})
export class FormationsViewerComponent implements OnInit {
  filterDateDeb : Date ;
  filterDateFin : Date;
  submitFilterDate : boolean =false;

  savedSe : Map<SessionFormation,boolean> = new Map();
  categorieFilter : Categorie ;
filt : boolean = false ;
  saveF : boolean = false;
  savedSessions : SessionFormation;
sessions : SessionFormation[];
filterSessions : SessionFormation[];
cat : Categorie[];
f : Formation ;
fileInfos: Observable<any>;


// counter
nouvCours : number = 0 ;
archive : number = 0;
OuvertInscrit : number = 0 ;
enCours : number = 0 ;
aVenir : number = 0 ;
toutCours : number = 0 ;
 
titreF : string;

nouvCoursCheck : any;
archiveCheck : any;
ouvertInscritCheck : any;
enCoursCheck: any;
aVenirCheck : any;

  constructor(private router: Router,private sessionService : SessionFormationService,private categorieService: CategorieService, private uploadService : UploadFileService, private messageService : MessageService) { }

  ngOnInit(): void {
/**    if(localStorage.getItem("formationSaved")){
      this.savedSe = JSON.parse(localStorage.getItem("formationSaved"))
      } */

    this.sessionService.getSessions().toPromise().then(data =>{ this.sessions = data
      this.filterSessions = this.sessions ;
      this.toutCours = this.sessions.length ;
      this.sessions.forEach(s => {
        if(new Date(s.dateDebSession) > new Date())
        this.nouvCours ++ ;
        if(new Date(s.dateFinSession) < new Date())
        this.archive ++;
        if(s.listeCandidat.length < s.nbMaxCandidat)
        this.OuvertInscrit ++;
        if((new Date() >= new Date(s.dateDebSession))&&(new Date() <= new Date(s.dateFinSession)))
        this.enCours ++;
        if(new Date(s.dateDebSession) >new Date())
        this.aVenir ++ ;
      });
    });
    this.categorieService.getAllCategories().toPromise().then( data => {
      this.cat = data ;
        console.log("everthing is okay geet categorie",data)
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

    toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });

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
  }
  testImage(t : string){
    return t.includes("image") ;
 }
  func(){
    if(this.filt==false)
    this.filt = true
    else
    this.filt = false

  }
  testSession(session){
  if((this.savedSe) && (this.savedSe.get(session)==true))
    return true

  return false
  }
  saveFormation(session){
    this.savedSe.set(session,true)
    console.log(this.savedSe)
   // localStorage.setItem("formationSaved", JSON.stringify(this.savedSe.keys()));
    // add to candidat saved session
    

  }
  deleteFormation(session){
    this.savedSe.delete(session)
  //  localStorage.setItem("formationSaved", JSON.stringify(this.savedSe.entries()));

  }


  filterParDate(){
    console.log("sess",this.sessions)
this.submitFilterDate=true ;
console.log(this.filterDateDeb,this.filterDateFin)
if(this.filterDateDeb && this.filterDateFin){
  this.sessions = this.filterSessions.filter(s =>
    this.filterDateDeb <= new Date(s.dateDebSession) && new Date(s.dateFinSession) <= this.filterDateFin
    );
   // this.sessions = this.
   console.log("filter",this.sessions)
}else 
  if(this.filterDateDeb){
  this.sessions = this.filterSessions.filter(s =>
    new Date(s.dateDebSession) >= this.filterDateDeb 
    );

  }
  else 
    if(this.filterDateFin){
      this.sessions = this.filterSessions.filter(s =>
        new Date(s.dateFinSession) <= this.filterDateFin
        );
      }
if(this.sessions.length == 0)
{
  this.sessions = this.filterSessions
console.log("aucune formation")
}
  }

  filtreParTitre(){
  if(this.titreF === '') {
  this.sessions=this.filterSessions;
  } 
  else{
  let filterValueLower = this.titreF.toLowerCase();
  this.sessions= this.filterSessions.filter(s => s.titreSession.toLowerCase().includes(filterValueLower)); //|| s.descriptionSession.toLowerCase().includes(filterValue)
  }
  }

  filtreParCategorie(){
    console.log(this.categorieFilter)
    if(this.categorieFilter[0]==null){
    this.sessions=this.filterSessions;}
    else{
    this.sessions = this.filterSessions.filter(s =>
       s.formationSession.listCategories.find( c => c.id === this.categorieFilter[0].id)
       ); //|| s.descriptionSession.toLowerCase().includes(filterValue)
  console.log(this.sessions) 
  }

  } 

  filterChange(){
    this.sessions = this.filterSessions
if(this.titreF){
      let filterValueLower = this.titreF.toLowerCase();
      this.sessions= this.sessions.filter(s => s.titreSession.toLowerCase().includes(filterValueLower)); //|| s.descriptionSession.toLowerCase().includes(filterValue) 
    }

if(this.filterDateDeb || this.filterDateFin){
  this.submitFilterDate=true ;
  console.log(this.filterDateDeb,this.filterDateFin)
  if(this.filterDateDeb && this.filterDateFin){
    this.sessions = this.sessions.filter(s =>
      this.testDate(s.dateDebSession,s.dateFinSession)

      );
     // this.sessions = this.
     console.log("filter",this.sessions)
  }else 
    if(this.filterDateDeb){
    this.sessions = this.sessions.filter(s =>
      new Date(s.dateDebSession) >= this.filterDateDeb 
      );
  
    }
    else 
      if(this.filterDateFin){
        this.sessions = this.sessions.filter(s =>
          new Date(s.dateFinSession) <= this.filterDateFin
          );
        }
    }

    
  if(this.categorieFilter){
    this.sessions = this.sessions.filter(s =>
       s.formationSession.listCategories.find( c => c.id === this.categorieFilter[0].id)
       ); 

    }

    //*****checkbox filter :
    console.log("==",this.archiveCheck)
    console.log(this.nouvCoursCheck)
    if(this.nouvCoursCheck == true){
      this.sessions = this.sessions.filter(s =>
        new Date(s.dateDebSession) > new Date()
        ); 
    }
    if(this.archiveCheck == true){
      console.log(this.archiveCheck)
      this.sessions = this.sessions.filter(s =>
        new Date(s.dateFinSession) < new Date()
        ); 
    }
    if(this.ouvertInscritCheck == true){
      this.sessions = this.sessions.filter(s =>
        s.listeCandidat.length < s.nbMaxCandidat
        ); 
    }
    if(this.enCoursCheck == true){
      this.sessions = this.sessions.filter(s =>
        (new Date() >= new Date(s.dateDebSession))&&(new Date() <= new Date(s.dateFinSession))
        ); 
    }
    if(this.aVenirCheck == true){
      this.sessions = this.sessions.filter(s =>
        new Date(s.dateDebSession) >new Date()
        ); 
    }
    if(this.sessions.length == 0){
      this.messageService.add({severity:'warn', summary: 'Vide', detail: 'aucune Formation trouvée', life: 3000});
    }



    



  }
  testDate(dateDeb :Date ,dateFin : Date){
    dateDeb = new Date(dateDeb) ;
    dateDeb.setHours(0,0,0,0);
    dateFin = new Date(dateFin) ;
    dateFin.setHours(0,0,0,0);

    return this.filterDateDeb <= dateDeb && dateFin <= this.filterDateFin

  }

  nbCandidat(session : SessionFormation){
    if(session.nbMaxCandidat == session.listeCandidat.length)
    return true

    return false
  }
  detailSession(session : SessionFormation){
    this.router.navigateByUrl('home/session/'+session.idSession);
  }
  clearDateFilter(){
    this.submitFilterDate = false ;
    this.filterDateDeb = null ;
    this.filterDateFin = null ;
    this.filterChange();
  }

}
