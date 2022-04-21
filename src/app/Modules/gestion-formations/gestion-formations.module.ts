import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccordionModule} from 'primeng/accordion';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {ToolbarModule} from 'primeng/toolbar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule, MatTextareaAutosize} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {ComponentsModule} from './../../components/components.module'
import {SplitButtonModule} from 'primeng/splitbutton'
import {RadioButtonModule} from 'primeng/radiobutton'


import { GestionFormationsRoutingModule } from './gestion-formations-routing.module';
import { ListeFormationsComponent } from './liste-formations/liste-formations.component';
import { ButtonModule } from 'primeng/button';
import {StyleClassModule} from 'primeng/styleclass';
import {CheckboxModule} from 'primeng/checkbox';
import {RippleModule} from 'primeng/ripple';
import {FieldsetModule} from 'primeng/fieldset';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { TextFieldModule } from '@angular/cdk/text-field';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { PanelModule } from 'primeng/panel';
import { MessagesModule } from 'primeng/messages';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MultiSelectModule } from 'primeng/multiselect';
import {InputMaskModule} from 'primeng/inputmask';
import {NgxFileDropModule} from 'ngx-file-drop';

//import {} from 'primeng/';


@NgModule({
  declarations: [
    ListeFormationsComponent,
  ],
  imports: [
    CommonModule,
    GestionFormationsRoutingModule,
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
    ConfirmDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    FieldsetModule,
    MatSelectModule,
    MatTooltipModule,
    ComponentsModule,
    SplitButtonModule,
    ConfirmDialogModule,
    ButtonModule,
    RippleModule,
    InputMaskModule
    NgxFileDropModule
  ]
})
export class GestionFormationsModule { }
