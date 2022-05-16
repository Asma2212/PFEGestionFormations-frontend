import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GestionCandidatComponent} from "../../gestion-candidats/gestion-candidat/gestion-candidat.component";
import {ListeCandidatsComponent} from "../../gestion-candidats/liste-candidats/liste-candidats.component";
import {AjouterCandidatComponent} from "../../gestion-candidats/ajouter-candidat/ajouter-candidat.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {SessionComponent} from "./session/session.component";
import {FormationsViewerComponent} from "./formations-viewer/formations-viewer.component";
import {HomePage1Component} from "./home-page1/home-page1.component";
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {HomeDetailsComponent} from "./home-details/home-details.component";
import {ContainerComponent} from "../../espace-candidat/container/container.component";

const routes: Routes = [{
  path: 'home',
  component : HomePageComponent,
  children: [
    {
      path: 'session/:id',
      component: SessionComponent,
    },
    {  path: 'formation',
      component: FormationsViewerComponent,
    },
    {  path: 'home1',
      component: HomePage1Component,
    },
    {path:'detailsHome',
      component:HomeDetailsComponent

    },
    {path:"nav",
    component:NavBarComponent}
    /*{path:'candidat',
      loadChildren:() =>import('../../espace-candidat/espace-candidat.module').then(m =>m.EspaceCandidatModule)},
*/,{
  path:"candidat",
      component:ContainerComponent
    }

  ],

} ,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessFreeRoutingModule { }
