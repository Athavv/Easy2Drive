import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentsComponent } from './add-students/add-students.component';
import { EditStudentsComponent } from './edit-students/edit-students.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { ListElevesComponent } from './admin/list-eleves/list-eleves.component';
import { AddElevesComponent } from './admin/add-eleves/add-eleves.component';


export const routes: Routes = [
    
    { path: 'add-eleve', component: ListStudentsComponent, pathMatch: 'full' },
    { path: 'add-student', component: AddStudentsComponent },
    { path: 'add-eleves', component: AddElevesComponent },
    { path: 'edit/:id', component: EditStudentsComponent },
    { path: '', component: ListElevesComponent },

];

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    declarations: []
  })

  export class AppRoutingModule { }

