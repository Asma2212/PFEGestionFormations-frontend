import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GestionCandidatComponent} from "../../gestion-candidats/gestion-candidat/gestion-candidat.component";
import {ListeCandidatsComponent} from "../../gestion-candidats/liste-candidats/liste-candidats.component";
import {AjouterCandidatComponent} from "../../gestion-candidats/ajouter-candidat/ajouter-candidat.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {SessionComponent} from "./session/session.component";
import { HomeComponent } from './home/home.component';
import { FormationsViewerComponent } from './formations-viewer/formations-viewer.component';

const routes: Routes = [{
  path: '',
  component : HomeComponent,
  children: [
    {
      path: 'home',
      component: HomePageComponent,
    },
    {
      path: 'session/:id',
      component: SessionComponent,
    },
    {
      path: 'formation',
      component: FormationsViewerComponent,
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessFreeRoutingModule { }
