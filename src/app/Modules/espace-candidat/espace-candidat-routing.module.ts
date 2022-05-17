import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContainerComponent} from "./container/container.component";
import {CalendarFormateurComponent} from "../espace-formateur/calendar-formateur/calendar-formateur.component";
import {NavBarCandidatComponent} from "./nav-bar-candidat/nav-bar-candidat.component";
import {DashboardCandidatComponent} from "./dashboard-candidat/dashboard-candidat.component";

const routes: Routes = [{
  path: '',
  component :ContainerComponent,
  children: [
   {
      path: 'nav',
      component: NavBarCandidatComponent,
    }, {
    path:"dasboardCandidat",
      component:DashboardCandidatComponent,
    }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaceCandidatRoutingModule { }
