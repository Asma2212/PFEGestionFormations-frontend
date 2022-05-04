import { Component, OnInit } from '@angular/core';
import { Categorie } from 'app/models/Categorie';
import { Formation } from 'app/models/Formation';
import { NivDifficulteEnum } from 'app/models/NivDifficulteEnum';
import { SessionFormation } from 'app/models/SessionFormation';
import { SessionFormationService } from 'app/services/SessionFormation.service';

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
  constructor(private sessionService : SessionFormationService) { }

  ngOnInit(): void {
   // this.sessionService.getSessions().toPromise().then(data => this.sessions = data);
   this.cat = [{
    idCategorie : 1,
    titre : "Angular",
    description : "dev web front end" ,
    listFormations : null},{
        idCategorie : 2,
        titre : "Spring Boot",
        description : "dev web back end" ,
        listFormations : null}
    ]
    this.f= {
      idFormation : 1,
    titre : "angular",
    charge_horaire : "10h",
    details : "",
    image : "",
    listCategories : this.cat,
    }

    this.sessions = [
      {
        idSession : 0,
        titreSession : "Full stack dev",
        lieuSession : "",
        descriptionSession : "formation certifié", 
        dateDebSession : new Date(2022,4,1),
        dateFinSession : new Date(2022,4,4),
        photoSession : "../../../../../assets/img/forma.jpg",
        planning : null,
        programme : "",
        nivDifficulte : NivDifficulteEnum.avance ,
        nbMaxCandidat : 10,
        formationSession : this.f,
        listeFormateurs : null,
        listeCandidat : null,
      },{
        idSession : 1,
        titreSession : "Full stack dev",
        lieuSession : "",
        descriptionSession : "formation certifié", 
        dateDebSession : new Date(),
        dateFinSession : new Date(),
        photoSession : "../../../../../assets/img/forma.jpg",
        planning : null,
        programme : "",
        nivDifficulte : NivDifficulteEnum.avance ,
        nbMaxCandidat : 10,
        formationSession : this.f,
        listeFormateurs : null,
        listeCandidat : null,
      },{
        idSession : 2,
        titreSession : "Full stack dev",
        lieuSession : "",
        descriptionSession : "formation certifié", 
        dateDebSession : new Date(),
        dateFinSession : new Date(),
        photoSession : "../../../../../assets/img/forma.jpg",
        planning : null,
        programme : "",
        nivDifficulte : NivDifficulteEnum.avance ,
        nbMaxCandidat : 10,
        formationSession : this.f,
        listeFormateurs : null,
        listeCandidat : null,
      },{
        idSession : 3,
        titreSession : "xxxxxx",
        lieuSession : "",
        descriptionSession : "formation certifié", 
        dateDebSession : new Date(),
        dateFinSession : new Date(),
        photoSession : "../../../../../assets/img/forma.jpg",
        planning : null,
        programme : "",
        nivDifficulte : NivDifficulteEnum.avance ,
        nbMaxCandidat : 10,
        formationSession : this.f,
        listeFormateurs : null,
        listeCandidat : null,
      },
    ]
    this.filterSessions = this.sessions ;
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
    // add to candidat saved session
    
/**    if(JSON.parse(localStorage.getItem("savedS")))
    this.savedSessions = JSON.parse(localStorage.getItem("savedS"));
    this.savedSessions.push(session);
    console.log(this.savedSessions)
    localStorage.setItem("savedS", JSON.stringify(this.savedSessions)); //store sessions */

  }
  deleteFormation(session){
    this.savedSe.delete(session)

  }

  archivie(){
    console.log("archivié")
  }

  filterParDate(){


    console.log("sess",this.sessions)
this.submitFilterDate=true ;
if(this.filterDateDeb && this.filterDateFin){
  this.sessions = this.filterSessions.filter(s =>
    this.filterDateDeb <= s.dateDebSession && s.dateFinSession <= this.filterDateFin
    );
   // this.sessions = this.
   console.log("filter",this.sessions)
   if(this.sessions.length == 0)
   console.log("aucune formation")
}else 
if(this.filterDateDeb){
  this.sessions = this.filterSessions.filter(s =>
    s.dateDebSession >= this.filterDateDeb 
    );
    if(this.sessions.length == 0)
    console.log("aucune formation")

}
else if(this.filterDateFin){
  this.sessions = this.filterSessions.filter(s =>
     s.dateFinSession <= this.filterDateFin
    );
    if(this.sessions.length == 0)
    console.log("aucune formation")

}
  }

  filtreParTitre(filterValue : string){
    console.log("ff",filterValue);
   let filterValueLower = filterValue.toLowerCase();
  if(filterValue === '') {
  this.sessions=this.filterSessions;
  } 
  else{
  this.sessions= this.filterSessions.filter(s => s.titreSession.toLowerCase().includes(filterValueLower)); //|| s.descriptionSession.toLowerCase().includes(filterValue)
  }
  }

  filtreParCategorie(){
    if(!this.categorieFilter[0]){
    this.sessions=this.filterSessions;}
    else{
    this.sessions = this.filterSessions.filter(s =>
       s.formationSession.listCategories.includes(this.categorieFilter[0])
       ); //|| s.descriptionSession.toLowerCase().includes(filterValue)
  console.log(this.sessions) 
  }

  }

}
