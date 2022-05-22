import { Component, OnInit } from '@angular/core';
import {SessionFormationService} from "../../../services/SessionFormation.service";
import {SessionFormation} from "../../../models/SessionFormation";
import {CalendarOptions} from "@fullcalendar/core";
import {SessionService} from "../../../services/session.service";
import {LocalStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  sessions : SessionFormation[];
  events:any[] = [];
  calendarOptions: CalendarOptions ;
  color:string;
  borderC:string;
  df : Date ;

  constructor(private sessionService:SessionService,private Localstorage:LocalStorageService) { }

  ngOnInit(): void {
    this.sessionService.getCandidaSession(this.Localstorage.retrieve("username")).toPromise().then(data => {
        this.sessions = data
        this.sessions.forEach(s => {
          s.dateDebSession = new Date(s.dateDebSession);
          s.dateFinSession = new Date(s.dateFinSession)
          if (s.dateFinSession < new Date()) {
            this.color = '#E10000'
            this.borderC = '#960000'
          } else {
            this.color = '#03B3E6'
            this.borderC = '#0b81a2'
          }

          this.events.push({
            title: s.titreSession,
            start: s.dateDebSession,
            end: s.dateFinSession,
            backgroundColor: this.color,
            borderColor: this.borderC
          })
        });

        this.calendarOptions = {
          initialDate: '2022-05-05',
          locale: 'fr',
          initialView: 'dayGridMonth',
          dateClick: this.handleDateClick.bind(this), // bind is important!
          eventSources: [

            // your event source
            {
              events: this.events,
              // an option!
              textColor: 'white',

              // an option!
            },


            // any other event sources...

          ],
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',

          },
          editable: true,
          selectable: true,
          selectMirror: true,
          dayMaxEvents: true,
          displayEventTime: false,
          // weekends: false
        };
      }
    );

  }
  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }
}
