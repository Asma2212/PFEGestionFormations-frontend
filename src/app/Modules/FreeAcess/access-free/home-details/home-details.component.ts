import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import 'bootstrap';
import 'jquery';
import _, { map } from 'underscore';
@Component({
  selector: 'app-home-details',
  templateUrl: './home-details.component.html',
  styleUrls: ['./home-details.component.scss']
})
export class HomeDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log($('.carousel').carousel)
    $('.carousel').carousel({ interval: 3000 });


    var string = "Learn design by\n" +
      " prototyping";
    var str = string.split("");
    var el = document.getElementById('str');
    (function animate() {
      str.length > 0 ? el.innerHTML += str.shift() : clearTimeout(running);
      var running = setTimeout(animate, 90);
    })();


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

  }

}
