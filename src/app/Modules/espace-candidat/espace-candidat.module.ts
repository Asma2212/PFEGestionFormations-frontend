import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspaceCandidatRoutingModule } from './espace-candidat-routing.module';
import { ContainerComponent } from './container/container.component';
import {AccessFreeModule} from "../FreeAcess/access-free/access-free.module";
import { DashboardCandidatComponent } from './dashboard-candidat/dashboard-candidat.component';
import { RecommandedComponent } from './recommanded/recommanded.component';
import { ListInscriptionComponent } from './list-inscription/list-inscription.component';
import {DataViewModule} from "primeng/dataview";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import { NavComponent } from './nav/nav.component';
import {FormsModule} from "@angular/forms";
import {ToolbarModule} from "primeng/toolbar";
import { ArchiveComponent } from './archive/archive.component';
import { CalendarComponent } from './calendar/calendar.component';
import {MatDialogModule} from "@angular/material/dialog";
import {TabMenuModule} from "primeng/tabmenu";
import {NgProgressModule} from "ngx-progressbar";
import {CardModule} from "primeng/card";
import {SharedModule} from "../shared/shared.module";
import {FullCalendarModule} from "@fullcalendar/angular";
import { FavorisComponent } from './favoris/favoris.component';
import { EmptyListComponent } from './empty-list/empty-list.component';
import { EmptyArchiveComponent } from './empty-archive/empty-archive.component';
import {ToastModule} from "primeng/toast";
import {ProgressBarModule} from "primeng/progressbar";
import { ProfilCandidatComponent } from './profil-candidat/profil-candidat.component';
import { EditorModule } from 'primeng/editor';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputMaskModule } from 'primeng/inputmask';


@NgModule({
  declarations: [
    ContainerComponent,
    DashboardCandidatComponent,
    RecommandedComponent,
    ListInscriptionComponent,
    NavComponent,
    ArchiveComponent,
    CalendarComponent,
    FavorisComponent,
    EmptyListComponent,
    EmptyArchiveComponent,
    ProfilCandidatComponent,
  ],
    imports: [
        CommonModule,
        EspaceCandidatRoutingModule,
        AccessFreeModule,
        DataViewModule,
        DropdownModule,
        ButtonModule,
        FormsModule,
        NgProgressModule,
        ToolbarModule, MatDialogModule, TabMenuModule, CardModule, SharedModule, FullCalendarModule, ToastModule,
      ProgressBarModule,
      EditorModule,
      MultiSelectModule,
      InputMaskModule

    ]
})
export class EspaceCandidatModule { }
