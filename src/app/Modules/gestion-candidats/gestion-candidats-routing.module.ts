import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterCandidatComponent } from './ajouter-candidat/ajouter-candidat.component';
import { GestionCandidatComponent } from './gestion-candidat/gestion-candidat.component';
import { ListeCandidatsComponent } from './liste-candidats/liste-candidats.component';

const routes: Routes = [{
  path: 'candidats',
  component : GestionCandidatComponent,
  children: [
    {
      path: 'list',
      component: ListeCandidatsComponent,
    },{
      path: 'ajouter',
      component: AjouterCandidatComponent,
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionCandidatsRoutingModule { }
