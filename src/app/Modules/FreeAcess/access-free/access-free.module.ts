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
import {RatingModule} from "primeng/rating";
import {TagModule} from "primeng/tag";
import { FormationsViewerComponent } from './formations-viewer/formations-viewer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {AppModule} from "../../../app.module";
import {SlideMenuModule} from "primeng/slidemenu";
import {MenuModule} from "primeng/menu";
import { HomeDetailsComponent } from './home-details/home-details.component';




@NgModule({
  declarations: [
    SessionComponent,
    HomePageComponent,
    DetailsSessionComponent,
    FormationsViewerComponent,
    NavBarComponent,
    HomeDetailsComponent,
  ],
  imports: [
    CommonModule,
    AccessFreeRoutingModule,
    CardModule,
    ButtonModule,
    FormsModule,
    ToggleButtonModule,
    RatingModule,
    TagModule,
    AppModule,
    SlideMenuModule,
    MenuModule,

  ]
})
export class AccessFreeModule { }
