import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GestionCandidatComponent} from "../../gestion-candidats/gestion-candidat/gestion-candidat.component";
import {ListeCandidatsComponent} from "../../gestion-candidats/liste-candidats/liste-candidats.component";
import {AjouterCandidatComponent} from "../../gestion-candidats/ajouter-candidat/ajouter-candidat.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {SessionComponent} from "./session/session.component";

const routes: Routes = [{
  path: 'home',
  component : HomePageComponent,
  children: [
    {
      path: 'session/:id',
      component: SessionComponent,
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessFreeRoutingModule { }
