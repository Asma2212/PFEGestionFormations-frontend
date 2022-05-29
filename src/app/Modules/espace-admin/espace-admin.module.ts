import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspaceAdminRoutingModule } from './espace-admin-routing.module';
import { AdminCalendarComponent } from './admin-calendar/admin-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EspaceAdminComponent } from './espace-admin/espace-admin.component';
import dayGridPlugin, { DayGridView } from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { ArchitectureIsetComponent } from './architecture-iset/architecture-iset.component';
import {OrganizationChartModule} from 'primeng/organizationchart';
import { ToastModule } from 'primeng/toast';
import { GestionSuggestionComponent } from './gestion-suggestion/gestion-suggestion.component';
import {TableModule} from "primeng/table";
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {SliderModule} from "primeng/slider";
import {ProgressBarModule} from "primeng/progressbar";
import { GestionClasseComponent } from './gestion-classe/gestion-classe.component';
import { GestionDepartementComponent } from './gestion-departement/gestion-departement.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AdminCalendarComponent,
    EspaceAdminComponent,
    ArchitectureIsetComponent,
    GestionSuggestionComponent,
    GestionClasseComponent,
    GestionDepartementComponent
  ],
  imports: [
    CommonModule,
    EspaceAdminRoutingModule,
    FullCalendarModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    CheckboxModule,
    ButtonModule,
    TabViewModule,
    OrganizationChartModule,
    ToastModule,
    TableModule,
    MultiSelectModule,
    DropdownModule,
    SliderModule,
    ProgressBarModule,
    DynamicDialogModule,
    ToolbarModule,
    TableModule,
    ConfirmDialogModule,
    MessageModule,
    MultiSelectModule
  ]
})
export class EspaceAdminModule { }
