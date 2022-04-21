import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeFormationsComponent } from './liste-formations/liste-formations.component';
import {AuthGuradGuard} from "../Authentification/services/auth-gurad.guard";

export const formationsRoutes : Routes = [
  {
    path: '',
    component:ListeFormationsComponent,
    children: [
      {
        path: 'list',
        component: ListeFormationsComponent,
      } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(formationsRoutes)],
  exports: [RouterModule]
})
export class GestionFormationsRoutingModule { }
