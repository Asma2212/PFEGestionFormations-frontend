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
import {CarouselModule} from 'primeng/carousel';
import {GalleriaModule} from 'primeng/galleria';
import { MatIconModule } from "@angular/material/icon";
import { FormationsViewerComponent } from './formations-viewer/formations-viewer.component';




@NgModule({
  declarations: [
    SessionComponent,
    HomePageComponent,
    DetailsSessionComponent,
    FormationsViewerComponent,
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
        CarouselModule,
        GalleriaModule,
        MatIconModule
        
        
    ]
})
export class AccessFreeModule { }
