import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionCandidatsRoutingModule } from './gestion-candidats-routing.module';
import { GestionCandidatComponent } from './gestion-candidat/gestion-candidat.component';
import { ListeCandidatsComponent } from './liste-candidats/liste-candidats.component';
import { AjouterCandidatComponent } from './ajouter-candidat/ajouter-candidat.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SharedModule } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { LayoutModule } from '@angular/cdk/layout';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import {HttpClientModule,HttpClient} from "@angular/common/http";
import { InputNumberModule } from 'primeng/inputnumber';


@NgModule({
  declarations: [
    GestionCandidatComponent,
    ListeCandidatsComponent,
    AjouterCandidatComponent
  ],
  imports: [
    CommonModule,
    GestionCandidatsRoutingModule,
    CardModule,
    MultiSelectModule,
    DataViewModule,
    DropdownModule,
    SplitButtonModule,
    CardModule,
    SharedModule,
    FormsModule,
    InputTextareaModule,
    InputTextModule,
    LayoutModule,
    CommonModule,
    FormsModule,
    PanelModule,
    TabViewModule,
    InputTextModule,
    DialogModule,
    RatingModule,
    ButtonModule,HttpClientModule,
    ConfirmDialogModule,
    ToastModule,
    FormsModule,
    InputNumberModule
  ],  providers: [HttpClient]

})
export class GestionCandidatsModule { }
