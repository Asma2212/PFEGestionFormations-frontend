import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import {AuthGuard} from "../../Modules/Authentification/services/auth.guard";
import {AuthGuradGuard} from "../../Modules/Authentification/services/auth-gurad.guard";

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent ,canActivate: [AuthGuradGuard]},
    { path: 'user-profile',   component: UserProfileComponent ,canActivate: [AuthGuradGuard]},
    {
        path: 'GestionFormation',
          loadChildren: () => import('../../Modules/gestion-formations/gestion-formations.module').then(m => m.GestionFormationsModule)
        ,canActivate: [AuthGuradGuard] },
    {
        path: 'formateurs',
          loadChildren: () => import('../../Modules/gestion-formateurs/gestion-formateurs.module').then(m => m.GestionFormateursModule)
        ,canActivate: [AuthGuradGuard]},
    {
        path: 'candidats',
          loadChildren: () => import('../../Modules/gestion-candidats/gestion-candidats.module').then(m => m.GestionCandidatsModule)
        ,canActivate: [AuthGuradGuard]},
       { path: 'sessionsFormation',
        loadChildren: () => import('../../Modules/gestion-session-formation/gestion-session-formation.module').then(m => m.GestionSessionFormationModule)
      ,canActivate: [AuthGuradGuard]},
      {
        path: 'Admin',
          loadChildren: () => import('../../Modules/espace-admin/espace-admin.module').then(m => m.EspaceAdminModule)
        ,},

];
