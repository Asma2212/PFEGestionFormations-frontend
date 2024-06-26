import { Component, OnInit } from '@angular/core';
import { NivDifficulteEnum } from 'app/models/NivDifficulteEnum';
import { SessionFormation } from 'app/models/SessionFormation';
import { SessionFormationService } from 'app/services/SessionFormation.service';
import _, { map } from 'underscore';
import * as $ from "jquery";
import { Observable } from 'rxjs';
import { UploadFileService } from 'app/services/upload-file.service';
import { Router } from '@angular/router';
import { DateComponent, DateEnv } from '@fullcalendar/core';

@Component({
  selector: 'app-home1-page',
  templateUrl: './home-page1.component.html',
  styleUrls: ['./home-page1.component.scss']
})
export class HomePage1Component implements OnInit {
  sessions : SessionFormation[] ;
  sessionsCetteSemaine : SessionFormation[] ;
  sessionsAVenir : SessionFormation[] ;
  sessionsPassees : SessionFormation[] ;
	responsiveOptions;
  images: any[];
  fileInfos: Observable<any>;
  monDate :Date = new Date();
  readMore : boolean = false ;
  readLess : boolean = true ;

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
  constructor( private sessionService : SessionFormationService, private uploadService : UploadFileService,private router : Router) { }

  
  ngOnInit(): void {

    this.sessionService.getSessions().subscribe(data =>{ 
      this.sessions = data
      this.sessionsAVenir = this.sessions.filter(s => (new Date(s.dateDebSession).getMonth() == new Date().getMonth() || new Date(s.dateDebSession).getMonth() == new Date().getMonth()+1 ) )
      this.sessionsPassees = this.sessions.filter(s => new Date(s.dateFinSession)< new Date() && new Date(s.dateFinSession).getMonth() <= new Date().getMonth()-1)
      const nb = new Date(new Date().getFullYear(),new Date().getMonth(), 0).getDate()
      const nb1 = new Date().getDate()+7 ;
      if(nb1 > nb)
      {
        this.monDate.setDate(nb1-nb)
      if(new Date().getMonth() == 12){
      this.monDate.setMonth(1)
      this.monDate.setFullYear(new Date().getFullYear()+1)
      }
      else
      this.monDate.setMonth(new Date().getMonth() + 1)
    }
    else{
      this.monDate.setDate(nb1)
    }

      this.sessionsCetteSemaine = this.sessions.filter(s => new Date(s.dateDebSession) < this.monDate && new Date(s.dateFinSession) > new Date())
    })
    this.fileInfos = this.uploadService.getFiles();


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
    var slideDurationSetting = 700; //Amount of time for which slide is "locked"
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

  testImage(t : string){
    return t.includes("image") ;
 }
 detailSession(session : SessionFormation){
  this.router.navigateByUrl('home/session/'+session.idSession);
}
}
