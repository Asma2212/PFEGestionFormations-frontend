import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { GestionFormationsModule } from 'app/Modules/gestion-formations/gestion-formations.module';
import { ButtonModule } from 'primeng/button';
import {ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { GestionFormateursModule } from 'app/Modules/gestion-formateurs/gestion-formateurs.module';
import { GestionCandidatsModule } from 'app/Modules/gestion-candidats/gestion-candidats.module';
import { SharedModule } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { GestionSessionFormationModule } from 'app/Modules/gestion-session-formation/gestion-session-formation.module';
import { EspaceAdminModule } from 'app/Modules/espace-admin/espace-admin.module';
import { ChartModule } from 'primeng/chart';
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatSidenavModule,
    CardModule,
    MatIconModule,
    SidebarModule,
    MatToolbarModule,
    MatTooltipModule,
    SharedModule,
    PanelModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    ButtonModule,
    ToastModule,
    TableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    SidebarModule,
    GestionFormationsModule,
    GestionFormateursModule,
    GestionCandidatsModule,
    GestionSessionFormationModule,
    EspaceAdminModule,
    ChartModule,
    DialogModule,
    ConfirmDialogModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent
  ]
})

export class AdminLayoutModule {}
