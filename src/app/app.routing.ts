import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ListeFormationsComponent } from './Modules/gestion-formations/liste-formations/liste-formations.component';
import { GestionFormationsModule } from './Modules/gestion-formations/gestion-formations.module';
import {PagenotfoundComponent} from './Modules/NotFound404/pagenotfound/pagenotfound.component';
import {AdminLoginComponent} from './Modules/Authentification/login/admin/admin-login/admin-login.component';
import {AuthGuard} from "./Modules/Authentification/services/auth.guard";
import {AuthGuradGuard} from "./Modules/Authentification/services/auth-gurad.guard";
import {FormatuerLoginComponent} from "./Modules/Authentification/login/fomateur/formatuer-login/formatuer-login.component";
import {CandidatRegisterComponent} from "./Modules/Authentification/login/candidat/candidat-register/candidat-register.component";
import {HomePageComponent} from "./Modules/FreeAcess/access-free/home-page/home-page.component";
import {AccessFreeModule} from "./Modules/FreeAcess/access-free/access-free.module";
import {DashboardFormateurComponent} from "./Modules/espace-formateur/dashboard-formateur/dashboard-formateur.component";

const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',canActivate: [AuthGuradGuard],
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  },
  {path:'home',
  component:HomePageComponent,
/*
    loadChildren: () => import('./Modules/FreeAcess/access-free/access-free.module').then(m => m.AccessFreeModule)
*/

  },
  {path:'formateur_dashboard',
    component:DashboardFormateurComponent,
    loadChildren: () => import('./Modules/espace-formateur/espace-formateur.module').then(m => m.EspaceFormateurModule)

  },
  {path:'login/admin', component :AdminLoginComponent,canActivate: [AuthGuard]},
  {path:'login/formateur',component:FormatuerLoginComponent},
 /* {path:"register/candidat",component:CandidatRegisterComponent},*/

  { path: '**', pathMatch: 'full',
  component: PagenotfoundComponent
},
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
