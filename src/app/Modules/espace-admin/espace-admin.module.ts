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

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AdminCalendarComponent,
    EspaceAdminComponent,
    ArchitectureIsetComponent
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
        ToastModule
  ]
})
export class EspaceAdminModule { }
