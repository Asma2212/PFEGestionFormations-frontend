import {AccessFreeRoutingModule} from "./access-free-routing.module";
import {NgModule} from "@angular/core";
import {SessionComponent} from "./session/session.component";
import {APP_BASE_HREF, CommonModule, DatePipe, LocationStrategy, PathLocationStrategy} from "@angular/common";
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
import {HomePage1Component} from "./home-page1/home-page1.component";
import {CarouselModule} from "primeng/carousel";
import {AccordionModule} from 'primeng/accordion';
import {FieldsetModule} from 'primeng/fieldset';
import {CalendarModule} from 'primeng/calendar';
import { MultiSelectModule } from "primeng/multiselect";
import { ToastModule } from "primeng/toast";
import { SessionOnlineComponent } from './session-online/session-online.component';
import {ChipModule} from "primeng/chip";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {MessagesModule} from "../../messages/messages.module";
import {SharedModule} from "../../shared/shared.module";
import { SafeHtml1Pipe } from "./safe-html1.pipe";
import { ReviewingComponent } from './reviewing/reviewing.component';
import {BlockUIModule} from "primeng/blockui";
import {PanelModule} from "primeng/panel";
import { ContactComponent } from './contact/contact.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";



//import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    SessionComponent,
    HomePageComponent,
    DetailsSessionComponent,
    FormationsViewerComponent,
    NavBarComponent,
    HomeDetailsComponent,
    HomePage1Component,
    SessionOnlineComponent,
    SafeHtml1Pipe,
    ReviewingComponent,
    ContactComponent



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
    SlideMenuModule,
    MenuModule,
    CarouselModule,
    AccordionModule,
    FieldsetModule,
    CalendarModule,
    MultiSelectModule,
    ToastModule,
    ChipModule,
    ConfirmDialogModule,
    DialogModule,
    MessagesModule,
    SharedModule,
    BlockUIModule,
    PanelModule,
    MatDialogModule,

  ],
    exports: [
      NavBarComponent
  ],providers: [
    DatePipe,{provide:MAT_DIALOG_DATA,useValue:{}}]
})
export class AccessFreeModule { }
