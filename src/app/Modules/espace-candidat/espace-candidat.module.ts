import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspaceCandidatRoutingModule } from './espace-candidat-routing.module';
import { ContainerComponent } from './container/container.component';
import { NavBarCandidatComponent } from './nav-bar-candidat/nav-bar-candidat.component';
import {AccessFreeModule} from "../FreeAcess/access-free/access-free.module";
import { DashboardCandidatComponent } from './dashboard-candidat/dashboard-candidat.component';
import { RecommandedComponent } from './recommanded/recommanded.component';
import { ListInscriptionComponent } from './list-inscription/list-inscription.component';
import {DataViewModule} from "primeng/dataview";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";


@NgModule({
  declarations: [
    ContainerComponent,
    NavBarCandidatComponent,
    DashboardCandidatComponent,
    RecommandedComponent,
    ListInscriptionComponent
  ],
  imports: [
    CommonModule,
    EspaceCandidatRoutingModule,
    AccessFreeModule,
    DataViewModule,
    DropdownModule,
    ButtonModule
  ]
})
export class EspaceCandidatModule { }
