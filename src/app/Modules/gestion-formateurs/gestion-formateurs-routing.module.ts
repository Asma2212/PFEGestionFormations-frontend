import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterFormateurComponent } from './ajouter-formateur/ajouter-formateur.component';
import { GestionFormateursModule } from './gestion-formateurs.module';
import { GestionFormateursComponent } from './gestion-formateurs/gestion-formateurs.component';
import { ListeFormateursComponent } from './liste-formateurs/liste-formateurs.component';

const routes: Routes = [{
  path: 'formateurs',
  component : GestionFormateursComponent,
  children: [
    {
      path: 'list',
      component: ListeFormateursComponent,
    },{
      path: 'ajouter',
      component: AjouterFormateurComponent,
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionFormateursRoutingModule { }
