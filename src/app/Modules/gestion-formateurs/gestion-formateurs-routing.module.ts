import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionFormateursModule } from './gestion-formateurs.module';
import { GestionFormateursComponent } from './gestion-formateurs/gestion-formateurs.component';
import { ListeFormateursComponent } from './liste-formateurs/liste-formateurs.component';
import {AuthGuradGuard} from "../Authentification/services/auth-gurad.guard";

const routes: Routes = [{
  path: 'formateurs',
  component : GestionFormateursComponent,
  children: [
    {
      path: 'list',
      component: ListeFormateursComponent,
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionFormateursRoutingModule { }
