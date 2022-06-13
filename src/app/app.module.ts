import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AccordionModule} from 'primeng/accordion';
import {ToastModule} from 'primeng/toast';
import {ConfirmationService, MenuItem, MessageService, SharedModule} from 'primeng/api';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';

import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';

import {AppComponent} from './app.component';


import {
  AgmCoreModule
} from '@agm/core';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {GestionFormateursModule} from './Modules/gestion-formateurs/gestion-formateurs.module';
import {GestionFormationsModule} from './Modules/gestion-formations/gestion-formations.module';
import {ToolbarModule} from 'primeng/toolbar';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {PagenotfoundComponent} from './modules/notfound404/pagenotfound/pagenotfound.component';
import {NgxFileDropModule} from 'ngx-file-drop';
import {AdminLoginComponent} from './Modules/Authentification/login/admin/admin-login/admin-login.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {AuthService} from './services/auth.service';
import {BrowserModule} from '@angular/platform-browser';
import {TokenInterceptor} from "./Modules/Authentification/login/admin/admin-login/TokenInterceptor";
import {ToastrModule} from "ngx-toastr";
import {MessageModule} from "primeng/message";
import {FormatuerLoginComponent} from "./Modules/Authentification/login/fomateur/formatuer-login/formatuer-login.component";
import {TooltipModule} from "primeng/tooltip";
import {CandidatRegisterComponent} from './Modules/Authentification/login/candidat/candidat-register/candidat-register.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {PasswordModule} from "primeng/password";
import {MultiSelectModule} from "primeng/multiselect";
import {AccessFreeModule} from "./Modules/FreeAcess/access-free/access-free.module";
import {NgToastModule} from "ng-angular-popup";
import {MatDialogModule} from "@angular/material/dialog";
import {ChatComponent} from "./Modules/message/chat/chat.component";
import {VirtualScrollerModule} from "primeng/virtualscroller";
import {DialogModule} from "primeng/dialog";
import { EspaceFormateurModule } from './Modules/espace-formateur/espace-formateur.module';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
//import { ChatComponent } from './Modules/message/chat/chat.component';

@NgModule({
  imports: [BrowserModule,
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
    NgxFileDropModule,
    AccordionModule,
    GestionFormationsModule,
    AccessFreeModule,
    ToastModule,
    HttpClientModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    NgToastModule,
    MatDialogModule,
    DialogModule,
    InputTextModule,
    RatingModule,
    NgxWebstorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }), MessageModule, TooltipModule, MatFormFieldModule, PasswordModule, MultiSelectModule, VirtualScrollerModule, DialogModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    PagenotfoundComponent,
    AdminLoginComponent,
    FormatuerLoginComponent,
    CandidatRegisterComponent,
    ChatComponent,
    
  ],
  providers: [MessageService, HttpClient,

    ConfirmationService, [{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }]
  ],
    exports: [
        CandidatRegisterComponent,
        ChatComponent
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
