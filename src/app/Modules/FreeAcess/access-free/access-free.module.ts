import {AccessFreeRoutingModule} from "./access-free-routing.module";
import {NgModule} from "@angular/core";
import {SessionComponent} from "./session/session.component";
import { CommonModule } from "@angular/common";
import { HomePageComponent } from './home-page/home-page.component';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {ToggleButtonModule} from "primeng/togglebutton";
import { DetailsSessionComponent } from './details-session/details-session.component';




@NgModule({
  declarations: [
    SessionComponent,
    HomePageComponent,
    DetailsSessionComponent,
  ],
  imports: [
    CommonModule,
    AccessFreeRoutingModule,
    CardModule,
    ButtonModule,
    FormsModule,
    ToggleButtonModule
  ]
})
export class AccessFreeModule { }
