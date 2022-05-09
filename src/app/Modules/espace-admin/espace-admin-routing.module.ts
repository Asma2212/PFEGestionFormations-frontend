import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCalendarComponent } from './admin-calendar/admin-calendar.component';
import { ArchitectureIsetComponent } from './architecture-iset/architecture-iset.component';
import { EspaceAdminComponent } from './espace-admin/espace-admin.component';

const routes: Routes = [{
  path: 'Admin',
  component :EspaceAdminComponent,
  children: [
    {
      path: 'Calendar',
      component: AdminCalendarComponent,
    },
    {
      path: 'Architecture',
      component: ArchitectureIsetComponent,
    }
    
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaceAdminRoutingModule { }
