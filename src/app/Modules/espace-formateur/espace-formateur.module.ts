import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspaceFormateurRoutingModule } from './espace-formateur-routing.module';
import { CalendarFormateurComponent } from './calendar-formateur/calendar-formateur.component';
import { DashboardFormateurComponent } from './dashboard-formateur/dashboard-formateur.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [
    CalendarFormateurComponent,
    DashboardFormateurComponent
  ],
  imports: [
    CommonModule,
    EspaceFormateurRoutingModule,

    FullCalendarModule,

    /* FullCalendarModule,
     CalendarModule,*/


  ]
})
export class EspaceFormateurModule { }
