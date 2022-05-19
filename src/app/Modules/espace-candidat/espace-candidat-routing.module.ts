import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContainerComponent} from "./container/container.component";
import {CalendarFormateurComponent} from "../espace-formateur/calendar-formateur/calendar-formateur.component";
import {DashboardCandidatComponent} from "./dashboard-candidat/dashboard-candidat.component";
import {NavComponent} from "./nav/nav.component";

const routes: Routes = [{
  path: '',
  component :ContainerComponent,
  children: [

    {
    path:'dasboardCandidat',
      component:DashboardCandidatComponent,
    },{
    path:"n",
      component:NavComponent
    }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaceCandidatRoutingModule { }
