import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "../FreeAcess/access-free/home-page/home-page.component";
import {SessionComponent} from "../FreeAcess/access-free/session/session.component";
import {DashboardFormateurComponent} from "./dashboard-formateur/dashboard-formateur.component";
import {CalendarFormateurComponent} from "./calendar-formateur/calendar-formateur.component";
import { FirstLoginFormateurComponent } from './first-login-formateur/first-login-formateur.component';
import { ProfilFormateurComponent } from './profil-formateur/profil-formateur.component';
import { FormationAvenirComponent } from './formation-avenir/formation-avenir.component';
import { DetailSessionFormateurComponent } from './detail-session-formateur/detail-session-formateur.component';
import { HistoriqueFormationComponent } from './historique-formation/historique-formation.component';

const routes: Routes = [{
  path: '',
  component : DashboardFormateurComponent,
  children: [
    {
      path: 'calendar',
      component: CalendarFormateurComponent,
    },
    {
      path: 'firstLogin',
      component: FirstLoginFormateurComponent,
    },    {
      path: 'profil',
      component: ProfilFormateurComponent,
    },{
      path: 'sessions',
      component: FormationAvenirComponent,
    },
    {
      path: 'historique',
      component: HistoriqueFormationComponent,
    },{
      path: 'detail/session/:id',
      component: DetailSessionFormateurComponent,
    }
  ]
}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaceFormateurRoutingModule { }
