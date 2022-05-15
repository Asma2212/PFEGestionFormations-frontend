import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspaceFormateurRoutingModule } from './espace-formateur-routing.module';
import { CalendarFormateurComponent } from './calendar-formateur/calendar-formateur.component';
import { DashboardFormateurComponent } from './dashboard-formateur/dashboard-formateur.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import { FirstLoginFormateurComponent } from './first-login-formateur/first-login-formateur.component';
import { FormationAvenirComponent } from './formation-avenir/formation-avenir.component';
import { HistoriqueFormationComponent } from './historique-formation/historique-formation.component';
import { ProfilFormateurComponent } from './profil-formateur/profil-formateur.component';
import { AccessFreeModule } from '../FreeAcess/access-free/access-free.module';
import { NavBarComponent } from '../FreeAcess/access-free/nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [
    CalendarFormateurComponent,
    DashboardFormateurComponent,
    FirstLoginFormateurComponent,
    FormationAvenirComponent,
    HistoriqueFormationComponent,
    ProfilFormateurComponent
  ],
  imports: [
    CommonModule,
    EspaceFormateurRoutingModule,
    FullCalendarModule,
    AccessFreeModule,
    FormsModule,
    InputNumberModule
    /* FullCalendarModule,
     CalendarModule,*/


  ]
})
export class EspaceFormateurModule { }
