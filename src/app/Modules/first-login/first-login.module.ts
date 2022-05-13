import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstLoginRoutingModule } from './first-login-routing.module';
import { FirstLoginComponent } from './first-login/first-login.component';
import { ToastModule } from 'primeng/toast';
import { StepsModule } from 'primeng/steps';
import { ProfilComponent } from './profil/profil.component';
import { PhotoComponent } from './photo/photo.component';
import { SecuriteComponent } from './securite/securite.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { MultiSelectModule } from 'primeng/multiselect';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {DividerModule} from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [
    FirstLoginComponent,
    ProfilComponent,
    PhotoComponent,
    SecuriteComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    FirstLoginRoutingModule,
    ToastModule,
    StepsModule,
    CardModule,
    ButtonModule,
    FormsModule,
    InputNumberModule,
    InputMaskModule,
    MultiSelectModule,
    InputTextareaModule,
    InputTextModule,
    PasswordModule,
    DividerModule,
    MessageModule, 
    CalendarModule
  ]
})
export class FirstLoginModule { }
