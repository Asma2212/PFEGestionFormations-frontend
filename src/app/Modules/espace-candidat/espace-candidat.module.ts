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


@NgModule({
  declarations: [
    ContainerComponent,
    DashboardCandidatComponent,
    RecommandedComponent,
    ListInscriptionComponent,
    NavComponent,
  ],
  imports: [
    CommonModule,
    EspaceCandidatRoutingModule,
    AccessFreeModule,
    DataViewModule,
    DropdownModule,
    ButtonModule,
    FormsModule
  ]
})
export class EspaceCandidatModule { }
