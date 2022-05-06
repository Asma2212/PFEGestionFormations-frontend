import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCalendarComponent } from './admin-calendar/admin-calendar.component';
import { EspaceAdminComponent } from './espace-admin/espace-admin.component';

const routes: Routes = [{
  path: 'Admin',
  component :EspaceAdminComponent,
  children: [
    {
      path: 'Calendar',
      component: AdminCalendarComponent,
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaceAdminRoutingModule { }
