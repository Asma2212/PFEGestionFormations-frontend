import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionSessionFormationRoutingModule } from './gestion-session-formation-routing.module';
import { SessionFormationComponent } from './session-formation/session-formation.component';
import {DataViewModule} from 'primeng/dataview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { SharedModule } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { MessagesModule } from 'primeng/messages';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';
import { AccordionModule } from 'primeng/accordion';
import { StyleClassModule } from 'primeng/styleclass';
import { TextFieldModule } from '@angular/cdk/text-field';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FormateursDialogComponent } from './formateurs-dialog/formateurs-dialog.component';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    SessionFormationComponent,
    FormateursDialogComponent
  ],
  entryComponents: [
    FormateursDialogComponent
],
  imports: [
    CommonModule,
    PanelModule,
    FormsModule,
    GestionSessionFormationRoutingModule,
    DataViewModule,
    ConfirmDialogModule,
    ButtonModule,
    RadioButtonModule,
    SelectButtonModule,
    MultiSelectModule,
    SharedModule,
    PanelModule,
    MessagesModule,
    FileUploadModule,
    InputTextareaModule,
    InputNumberModule,
    DropdownModule,
    ToastModule,
    InputTextModule,
    CheckboxModule,
    RippleModule,
    AccordionModule,
    StyleClassModule,
    TextFieldModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ToolbarModule,
    RatingModule,
    DropdownModule,
    BadgeModule,
    TooltipModule,
    DynamicDialogModule,
    CalendarModule
  ]
})
export class GestionSessionFormationModule { }
