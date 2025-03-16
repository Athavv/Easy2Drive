import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListElevesComponent } from './admin/list-eleves/list-eleves.component';
import { AddElevesComponent } from './admin/add-eleves/add-eleves.component';
import { EditElevesComponent } from './admin/edit-eleves/edit-eleves.component'; 

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