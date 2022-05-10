import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { FirstLoginComponent } from './first-login/first-login.component';
import { PhotoComponent } from './photo/photo.component';
import { ProfilComponent } from './profil/profil.component';
import { SecuriteComponent } from './securite/securite.component';

const routes: Routes = [

  {path:'',
  component: FirstLoginComponent, 
  children:[
    {path:'', redirectTo: 'profil', pathMatch: 'full'},
    {path: 'profil', component: ProfilComponent},
    {path: 'confirmation', component: ConfirmationComponent},
    {path: 'securité', component: SecuriteComponent},
    {path: 'photo', component: PhotoComponent}
  ]}


];

@NgModule({
  imports: [RouterModule.forChild(routes)
],
  exports: [RouterModule]
})
export class FirstLoginRoutingModule { }
