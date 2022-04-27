import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionFormationComponent } from './session-formation/session-formation.component';

const routes: Routes = [{
  path : 'sessionsFormation',
  component : SessionFormationComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionSessionFormationRoutingModule { }
