import { Component, OnInit } from '@angular/core';
import { NivDifficulteEnum } from 'app/models/NivDifficulteEnum';
import { SessionFormation } from 'app/models/SessionFormation';
import { SessionFormationService } from 'app/services/SessionFormation.service';

@Component({
  selector: 'app-formations-viewer',
  templateUrl: './formations-viewer.component.html',
  styleUrls: ['./formations-viewer.component.scss']
})
export class FormationsViewerComponent implements OnInit {
sessions : SessionFormation[];
  constructor(private sessionService : SessionFormationService) { }

  ngOnInit(): void {
   // this.sessionService.getSessions().toPromise().then(data => this.sessions = data);
    this.sessions = [
      {
        idSession : 0,
        titreSession : "Full stack dev",
        lieuSession : "",
        descriptionSession : "", 
        dateDebSession : new Date(),
        dateFinSession : new Date(),
        photoSession : "../../../../../assets/img/forma.jpg",
        planning : null,
        programme : "",
        nivDifficulte : NivDifficulteEnum.avance ,
        nbMaxCandidat : 10,
        formationSession : null,
        listeFormateurs : null,
        listeCandidat : null,
      },{
        idSession : 0,
        titreSession : "",
        lieuSession : "",
        descriptionSession : "", 
        dateDebSession : new Date(),
        dateFinSession : new Date(),
        photoSession : "",
        planning : null,
        programme : "",
        nivDifficulte : NivDifficulteEnum.avance ,
        nbMaxCandidat : 10,
        formationSession : null,
        listeFormateurs : null,
        listeCandidat : null,
      },{
        idSession : 0,
        titreSession : "",
        lieuSession : "",
        descriptionSession : "", 
        dateDebSession : new Date(),
        dateFinSession : new Date(),
        photoSession : "",
        planning : null,
        programme : "",
        nivDifficulte : NivDifficulteEnum.avance ,
        nbMaxCandidat : 10,
        formationSession : null,
        listeFormateurs : null,
        listeCandidat : null,
      },{
        idSession : 0,
        titreSession : "",
        lieuSession : "",
        descriptionSession : "", 
        dateDebSession : new Date(),
        dateFinSession : new Date(),
        photoSession : "",
        planning : null,
        programme : "",
        nivDifficulte : NivDifficulteEnum.avance ,
        nbMaxCandidat : 10,
        formationSession : null,
        listeFormateurs : null,
        listeCandidat : null,
      },{
        idSession : 0,
        titreSession : "",
        lieuSession : "",
        descriptionSession : "", 
        dateDebSession : new Date(),
        dateFinSession : new Date(),
        photoSession : "",
        planning : null,
        programme : "",
        nivDifficulte : NivDifficulteEnum.avance ,
        nbMaxCandidat : 10,
        formationSession : null,
        listeFormateurs : null,
        listeCandidat : null,
      },{
        idSession : 0,
        titreSession : "",
        lieuSession : "",
        descriptionSession : "", 
        dateDebSession : new Date(),
        dateFinSession : new Date(),
        photoSession : "",
        planning : null,
        programme : "",
        nivDifficulte : NivDifficulteEnum.avance ,
        nbMaxCandidat : 10,
        formationSession : null,
        listeFormateurs : null,
        listeCandidat : null,
      },{
        idSession : 0,
        titreSession : "",
        lieuSession : "",
        descriptionSession : "", 
        dateDebSession : new Date(),
        dateFinSession : new Date(),
        photoSession : "",
        planning : null,
        programme : "",
        nivDifficulte : NivDifficulteEnum.avance ,
        nbMaxCandidat : 10,
        formationSession : null,
        listeFormateurs : null,
        listeCandidat : null,
      },{
        idSession : 0,
        titreSession : "",
        lieuSession : "",
        descriptionSession : "", 
        dateDebSession : new Date(),
        dateFinSession : new Date(),
        photoSession : "",
        planning : null,
        programme : "",
        nivDifficulte : NivDifficulteEnum.avance ,
        nbMaxCandidat : 10,
        formationSession : null,
        listeFormateurs : null,
        listeCandidat : null,
      }
    ]

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

}