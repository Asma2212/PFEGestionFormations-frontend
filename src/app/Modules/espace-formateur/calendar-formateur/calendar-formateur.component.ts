import {Component, OnInit, ViewChild} from '@angular/core';
import {EventService} from "../../../services/event.service";
import {CalendarOptions} from "@fullcalendar/angular"; // useful for typechecking
import {formatDate} from '@fullcalendar/angular';
import {SessionFormation} from "../../../models/SessionFormation";
import {DatePipe} from "@angular/common";
import { SessionService } from 'app/services/session.service';
import { LocalStorageService } from 'ngx-webstorage';
import { FormateurService } from 'app/services/formateur.service';

@Component({
  selector: 'app-calendar-formateur',
  templateUrl: './calendar-formateur.component.html',
  styleUrls: ['./calendar-formateur.component.scss']
})

export class CalendarFormateurComponent implements OnInit {

  sessions : SessionFormation[];
  events:any[] = [];
  calendarOptions: CalendarOptions ;
  color:string;
  borderC:string;
  df : Date ;

  constructor(private sessionService:SessionService,private localStorage : LocalStorageService,private formateurService : FormateurService) { }


  ngOnInit(): void {
    const idF =Number(localStorage.getItem("idF"))
    this.formateurService.getSessionByFormateur(idF).subscribe(data => {this.sessions = data
  this.sessions = data
        console.log("sss",this.sessions)
        this.sessions.forEach(s => {
          console.log("fin",new Date(s.dateFinSession),"date",new Date("2022-05-05"))
          s.dateDebSession=new Date(s.dateDebSession);
          s.dateFinSession = new Date(s.dateFinSession)
          if(s.dateFinSession < new Date()){
      this.color = '#E10000'
      this.borderC = '#960000'
      }
      else{
      this.color = '#03B3E6'
      this.borderC ='#0b81a2'
       }
      
          this.events.push({
            title  : s.titreSession,
            start  : s.dateDebSession,
            end    : s.dateFinSession,
            backgroundColor: this.color,
          borderColor: this.borderC
          })
        });
      
          this.calendarOptions= {
            initialDate : '2022-05-05',
            locale: 'fr' ,
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
          selectable:true,
          selectMirror: true,
          dayMaxEvents: true ,
          displayEventTime: false,
         // weekends: false
          };
      }
        );
    
/**   this.sessions = [
    {
      idSession : 0,
      titreSession : "Full 2",
      lieuSession : "",
      descriptionSession : "formation certifié", 
      dateDebSession : new Date(2022,4,1),
      dateFinSession : new Date(2022,4,4),
      photoSession : "../../../../../assets/img/forma.jpg",
      planning : null,
      programme : "",
      nivDifficulte : NivDifficulteEnum.avance ,
      nbMaxCandidat : 10,
      formationSession : null,
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
      formationSession : null,
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
      formationSession : null,
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
      formationSession : null,
      listeFormateurs : null,
      listeCandidat : null,
    },
  ] */

    
  }
  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }

}



 /** events1: objCalendar[ ] = []
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
    this.eventService.getEvents().subscribe(events => {
      this.sessions = events
      console.log("what theee" + this.sessions.length)
      this.getsessioncalendar()

    })

  }




getsessioncalendar(){

      for (let i = 0; i < this.sessions.length; i++) {
        const datepipe: DatePipe = new DatePipe('en-US')
        let start = datepipe.transform(new Date(this.sessions[i].dateDebSession), 'YYYY-MM-dd')
        let end = datepipe.transform(new Date(this.sessions[i].dateFinSession), 'YYYY-MM-dd')

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
 */