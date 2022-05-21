import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages/messages.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    MessagesComponent
  ],
  exports: [
    MessagesComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    FormsModule
  ]
})
export class MessagesModule { }
