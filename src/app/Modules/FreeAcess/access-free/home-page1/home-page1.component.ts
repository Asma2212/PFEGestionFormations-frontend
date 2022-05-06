import { Component, OnInit } from '@angular/core';
import { NivDifficulteEnum } from 'app/models/NivDifficulteEnum';
import { SessionFormation } from 'app/models/SessionFormation';
import { SessionFormationService } from 'app/services/SessionFormation.service';
import _, { map } from 'underscore';
import * as $ from "jquery";

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



    /*

 */


    // ------------- VARIABLES ------------- //
    var ticking = false;
    var isFirefox = (/Firefox/i.test(navigator.userAgent));
    var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
    var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive)
    var slideDurationSetting = 600; //Amount of time for which slide is "locked"
    var currentSlideNumber = 0;
    var totalSlideNumber = $(".background").length;

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
    function parallaxScroll(evt) {
      if (isFirefox) {
        //Set delta for Firefox
        var delta = evt.detail * (-120);
      } else if (isIe) {
        //Set delta for IE
        delta = -evt.deltaY;
      } else {
        //Set delta for all other browsers
        delta = evt.wheelDelta;
      }

      if (ticking != true) {
        if (delta <= -scrollSensitivitySetting) {
          //Down scroll
          ticking = true;
          if (currentSlideNumber !== totalSlideNumber - 1) {
            currentSlideNumber++;
            nextItem();
          }
          slideDurationTimeout(slideDurationSetting);
        }
        if (delta >= scrollSensitivitySetting) {
          //Up scroll
          ticking = true;
          if (currentSlideNumber !== 0) {
            currentSlideNumber--;
          }
          previousItem();
          slideDurationTimeout(slideDurationSetting);
        }
      }
    }

// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
    function slideDurationTimeout(slideDuration) {
      setTimeout(function() {
        ticking = false;
      }, slideDuration);
    }

// ------------- ADD EVENT LISTENER ------------- //
    var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
    window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);

// ------------- SLIDE MOTION ------------- //
    function nextItem() {
      var $previousSlide = $(".background").eq(currentSlideNumber - 1);
      $previousSlide.removeClass("up-scroll").addClass("down-scroll");
    }

    function previousItem() {
      var $currentSlide = $(".background").eq(currentSlideNumber);
      $currentSlide.removeClass("down-scroll").addClass("up-scroll");
    }







    /*

     */

  }

  someMethod() {

  }
}
