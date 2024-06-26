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
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ProgressBarModule} from 'primeng/progressbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { DataViewModule } from 'primeng/dataview';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { DetailSessionFormateurComponent } from './detail-session-formateur/detail-session-formateur.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmationService, SharedModule } from 'primeng/api';
import {EditorModule} from 'primeng/editor';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ListCandidatsDialogComponent } from './list-candidats-dialog/list-candidats-dialog.component';
import { TableModule } from 'primeng/table';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {FileUploadModule} from 'primeng/fileupload';
import { SafeHtmlPipe } from './safe-html.pipe';
import { MatInputModule } from '@angular/material/input';
import { InputMaskModule } from 'primeng/inputmask';
import { MultiSelectModule } from 'primeng/multiselect';

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
    ProfilFormateurComponent,
    DetailSessionFormateurComponent,
    ListCandidatsDialogComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    EspaceFormateurRoutingModule,
    FullCalendarModule,
    AccessFreeModule,
    FormsModule,
    InputNumberModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    DataViewModule,
    ToolbarModule,
    DropdownModule,
    InputTextModule,
    TooltipModule,
    ToolbarModule,
    InputTextareaModule,
    EditorModule,
    InputTextareaModule,
    RadioButtonModule,
    TableModule,
    DynamicDialogModule,
    FileUploadModule,
    MatInputModule,
    RadioButtonModule,
    InputMaskModule,
    MultiSelectModule,
    /* FullCalendarModule,
     CalendarModule,*/
  ],
  exports : [
    SafeHtmlPipe
  ]
})
export class EspaceFormateurModule { }
