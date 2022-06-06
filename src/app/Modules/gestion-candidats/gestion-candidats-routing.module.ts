import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionCandidatComponent } from './gestion-candidat/gestion-candidat.component';
import { ListeCandidatsComponent } from './liste-candidats/liste-candidats.component';

const routes: Routes = [{
  path: 'candidats',
  component : GestionCandidatComponent,
  children: [
    {path:'', redirectTo: 'list', pathMatch: 'full'},
    {
      path: 'list',
      component: ListeCandidatsComponent,
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionCandidatsRoutingModule { }
