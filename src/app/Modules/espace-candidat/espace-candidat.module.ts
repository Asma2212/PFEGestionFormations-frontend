import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspaceCandidatRoutingModule } from './espace-candidat-routing.module';
import { ContainerComponent } from './container/container.component';
import { NavBarCandidatComponent } from './nav-bar-candidat/nav-bar-candidat.component';
import {AccessFreeModule} from "../FreeAcess/access-free/access-free.module";


@NgModule({
  declarations: [
    ContainerComponent,
    NavBarCandidatComponent
  ],
    imports: [
        CommonModule,
        EspaceCandidatRoutingModule,
        AccessFreeModule
    ]
})
export class EspaceCandidatModule { }
