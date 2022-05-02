import {Component, OnInit, ViewChild} from '@angular/core';
import {EventService} from "../../../services/event.service";
import {CalendarOptions} from "@fullcalendar/angular"; // useful for typechecking
import {formatDate} from '@fullcalendar/angular';
import {SessionFormation} from "../../../models/SessionFormation";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-calendar-formateur',
  templateUrl: './calendar-formateur.component.html',
  styleUrls: ['./calendar-formateur.component.scss']
})

export class CalendarFormateurComponent implements OnInit {

  events1: objCalendar[ ] = []
  randomColor :string
  options: any;

  header: any;
  sessions: Array<SessionFormation>
  calendarOptions: CalendarOptions;

  constructor(private eventService: EventService) {
  }

  ngOnInit():void {


    this.getSession()


  }

  handleDateClick(arg) {
    console.log("date clicked")
    //alert('date click! ' + arg.dateStr)
  }
  callendar( events1: objCalendar[ ]){
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      dateClick: this.handleDateClick.bind(this), // bind is important!
      events:events1,

      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }, editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true
    };

  }
  getSession() {
    this.eventService.getEvents().toPromise().then(events => {
      this.sessions = events
      console.log("what theee" + this.sessions.length)
      this.getsessioncalendar()

    })

  }




getsessioncalendar(){

      for (let i = 0; i < this.sessions.length; i++) {
        const datepipe: DatePipe = new DatePipe('en-US')
        let start = datepipe.transform(this.sessions[i].dateDebSession, 'YYYY-MM-dd')
        let end = datepipe.transform(this.sessions[i].dateFinSession, 'YYYY-MM-dd')

        const obj: objCalendar = {
          title: this.sessions[i].titreSession,
          start: start,
          end: end,
          backgroundColor:'#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6),
          eventBorderColor:'red',


        }

        this.events1.push(obj);
        this.callendar(this.events1)
      }



}
}

interface objCalendar {
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
  eventBorderColor:string ;
}
