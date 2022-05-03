import { Component, OnInit } from '@angular/core';
import { NivDifficulteEnum } from 'app/models/NivDifficulteEnum';
import { SessionFormation } from 'app/models/SessionFormation';
import { SessionFormationService } from 'app/services/SessionFormation.service';

@Component({
  selector: 'app-home1-page',
  templateUrl: './home-page1.component.html',
  styleUrls: ['./home-page1.component.scss']
})
export class HomePage1Component implements OnInit {
  sessions : SessionFormation[] ;
	responsiveOptions;
  images: any[];

  responsiveOptions1:any[] = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];
  constructor( private sessionService : SessionFormationService) { }

  ngOnInit(): void {
    this.sessions = [
      {
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
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  someMethod() {

  }
}
