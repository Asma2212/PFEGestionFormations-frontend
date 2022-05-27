import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContainerComponent} from "./container/container.component";
import {CalendarFormateurComponent} from "../espace-formateur/calendar-formateur/calendar-formateur.component";
import {DashboardCandidatComponent} from "./dashboard-candidat/dashboard-candidat.component";
import {NavComponent} from "./nav/nav.component";
import {ListInscriptionComponent} from "./list-inscription/list-inscription.component";
import {ArchiveComponent} from "./archive/archive.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {FavorisComponent} from "./favoris/favoris.component";
import {EmptyListComponent} from "./empty-list/empty-list.component";
import { ProfilCandidatComponent } from './profil-candidat/profil-candidat.component';

const routes: Routes = [{
  path: '',
  component :ContainerComponent,
  children: [{path:"myList",
  component:ListInscriptionComponent},
    {path:"myArchives",
    component:ArchiveComponent},
    {path:"calendar",
      component:CalendarComponent
    },
    {path:"MyFavorites",
      component:FavorisComponent},  {path:"ve",
      component:EmptyListComponent},

    {
    path:'dasboardCandidat',
      component:DashboardCandidatComponent,
    },{
    path:"n",
      component:NavComponent
    },{
      path:"profil",
        component:ProfilCandidatComponent
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaceCandidatRoutingModule { }
