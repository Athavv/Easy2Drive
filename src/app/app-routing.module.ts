import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListElevesComponent } from './admin/eleves/list-eleves/list-eleves.component';
import { AddElevesComponent } from './admin/eleves/add-eleves/add-eleves.component';
import { EditElevesComponent } from './admin/eleves/edit-eleves/edit-eleves.component'; 

export const routes: Routes = [
  { path: '', component: ListElevesComponent, pathMatch: 'full' }, 
  { path: 'add-eleves', component: AddElevesComponent }, 
  { path: 'modifier/:id', component: EditElevesComponent },
  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule] 
})
export class AppRoutingModule { }