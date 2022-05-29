import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataViewModule} from 'primeng/dataview';

import { GestionFormateursRoutingModule } from './gestion-formateurs-routing.module';
import { ListeFormateursComponent } from './liste-formateurs/liste-formateurs.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { LayoutModule } from '@angular/cdk/layout';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { SplitButtonModule } from 'primeng/splitbutton';
import { GestionFormateursComponent } from './gestion-formateurs/gestion-formateurs.component';
import { DialogModule } from 'primeng/dialog';
import { SharedModule } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import {InputMaskModule} from 'primeng/inputmask';
import { NgxFileDropModule } from 'ngx-file-drop';
import { InputNumberModule } from 'primeng/inputnumber';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { MatHeaderCell, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    ListeFormateursComponent,
    GestionFormateursComponent
  ],
    imports: [
        CommonModule,
        GestionFormateursRoutingModule,
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
        ButtonModule,
        MatIconModule,
        ConfirmDialogModule,
        ToolbarModule,
        ToastModule,
        HttpClientModule,
        RadioButtonModule,
        InputMaskModule,
        NgxFileDropModule,
        InputNumberModule,
        MatIconModule,
        TableModule,

        MatButtonModule,
        MatInputModule,
        MatTableModule,
        MatSelectModule,
        MatPaginatorModule,
        MatFormFieldModule


    ],  providers: [HttpClient]

})
export class GestionFormateursModule { }
