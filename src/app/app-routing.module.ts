import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListElevesComponent } from './admin/eleves/list-eleves/list-eleves.component';
import { AddElevesComponent } from './admin/eleves/add-eleves/add-eleves.component';
import { EditElevesComponent } from './admin/eleves/edit-eleves/edit-eleves.component'; 
import { ListAutoecolesComponent } from './admin/autoecoles/list-autoecoles/list-autoecoles.component';
import { EditAutoecoleComponent } from './admin/autoecoles/edit-autoecole/edit-autoecole.component';
import { AddAutoecoleComponent } from './admin/autoecoles/add-autoecole/add-autoecole.component';
import { HomeAdminComponent } from './admin/autoecoles/home-admin/home-admin.component';
import { ElevesAutoecoleComponent } from './admin/autoecoles/eleves-autoecole/eleves-autoecole.component';
import { ScoresEleveComponent } from './admin/eleves/scores-eleve/scores-eleve.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard'; 
import { HomeEleveComponent } from './eleve/home-eleve/home-eleve.component';
import { AvisComponent } from './eleve/avis/avis.component'; // Importez le composant Avis
import { AccueilComponent } from './accueil/accueil.component';

export const routes: Routes = [
  { path: 'Accueil', component: AccueilComponent },
  { path: 'login', component: LoginComponent }, 
  { path: 'Admin-Home', component: HomeAdminComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin' } }, 
  { path: 'list-eleves', component: ListElevesComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin' } }, 
  { path: 'add-eleves', component: AddElevesComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin' } }, 
  { path: 'modifier/:id', component: EditElevesComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin' } },
  { path: 'add-autoecoles', component: AddAutoecoleComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin' } }, 
  { path: 'list-autoecoles', component: ListAutoecolesComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin' } },
  { path: 'modifier-autoecole/:id', component: EditAutoecoleComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin' } },
  { path: 'infos-autoecole/:id', component: ElevesAutoecoleComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin' } },
  { path: 'infos-eleve/:id', component: ScoresEleveComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin' } },
  { path: 'eleve/profil', component: HomeEleveComponent, canActivate: [AuthGuard], data: { expectedRole: 'eleve' } },
  { path: 'eleve/avis', component: AvisComponent, canActivate: [AuthGuard], data: { expectedRole: 'eleve' } }, // Route pour les avis
  { path: '**', redirectTo: '/Accueil' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule] 
})
export class AppRoutingModule { }