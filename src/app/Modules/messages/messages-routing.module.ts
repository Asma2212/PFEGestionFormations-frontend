import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ArchiveComponent} from "../espace-candidat/archive/archive.component";
import {MessagesComponent} from "./messages/messages.component";

const routes: Routes = [  {path:"messagess",
  component:MessagesComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
