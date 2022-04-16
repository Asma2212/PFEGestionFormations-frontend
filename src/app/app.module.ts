import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {AccordionModule} from 'primeng/accordion';
import {ToastModule} from 'primeng/toast';
import {ConfirmationService, MenuItem, MessageService, SharedModule} from 'primeng/api';  
import {SidebarModule} from 'primeng/sidebar'; 
import {ButtonModule} from 'primeng/button'; 

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';


import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { GestionFormateursModule } from './Modules/gestion-formateurs/gestion-formateurs.module';
import { GestionFormationsModule } from './Modules/gestion-formations/gestion-formations.module';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    SidebarModule,
    ButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    ButtonModule,
    SidebarModule,
    PanelModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    RouterModule,
    AppRoutingModule,
    AccordionModule,
    GestionFormationsModule,
    ToastModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent

  ],
  providers: [ MessageService ,
  ConfirmationService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
