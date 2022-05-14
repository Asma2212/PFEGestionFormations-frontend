import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "../FreeAcess/access-free/home-page/home-page.component";
import {SessionComponent} from "../FreeAcess/access-free/session/session.component";
import {DashboardFormateurComponent} from "./dashboard-formateur/dashboard-formateur.component";
import {CalendarFormateurComponent} from "./calendar-formateur/calendar-formateur.component";
import { FirstLoginFormateurComponent } from './first-login-formateur/first-login-formateur.component';

const routes: Routes = [{
  path: 's',
  component : DashboardFormateurComponent,
  children: [
    {
      path: 'calendar_formateur',
      component: CalendarFormateurComponent,
    },
    {
      path: 'firstLogin',
      component: FirstLoginFormateurComponent,
    },
  ]
}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaceFormateurRoutingModule { }
