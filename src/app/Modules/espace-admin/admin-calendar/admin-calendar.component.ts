import { Component, OnInit } from '@angular/core';
import { Calendar, CalendarOptions, NowTimer } from '@fullcalendar/core';
import { NivDifficulteEnum } from 'app/models/NivDifficulteEnum';
import { SessionFormation } from 'app/models/SessionFormation';
import { SessionFormationService } from 'app/services/SessionFormation.service';
import { now } from 'jquery';

@Component({
  selector: 'app-admin-calendar',
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.scss']
})
export class AdminCalendarComponent implements OnInit {
 
  sessions : SessionFormation[];
  events:any[] = [];
  calendarOptions: CalendarOptions ;
  color:string;
  borderC:string;
  df : Date ;

  constructor(private sessionService:SessionFormationService) { }

  ngOnInit(): void {
    this.sessionService.getSessions().toPromise().then(data =>
      { console.log(data);
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
