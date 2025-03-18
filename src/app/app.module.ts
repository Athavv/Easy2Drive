import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ListElevesComponent } from './admin/eleves/list-eleves/list-eleves.component';
import { AddElevesComponent } from './admin/eleves/add-eleves/add-eleves.component';
import { EditElevesComponent } from './admin/eleves/edit-eleves/edit-eleves.component';
import { ListAutoecolesComponent } from './admin/autoecoles/list-autoecoles/list-autoecoles.component';
import { EditAutoecoleComponent } from './admin/autoecoles/edit-autoecole/edit-autoecole.component';
import { AddAutoecoleComponent } from './admin/autoecoles/add-autoecole/add-autoecole.component';
import { SidebarComponent } from './menu/sidebar/sidebar.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { ElevesAutoecoleComponent } from './admin/autoecoles/eleves-autoecole/eleves-autoecole.component';
import { ScoresEleveComponent } from './admin/eleves/scores-eleve/scores-eleve.component';


@NgModule({
  declarations: [
    AppComponent,
    ListElevesComponent,
    AddElevesComponent,
    EditElevesComponent,
    ListAutoecolesComponent,
    EditAutoecoleComponent,
    AddAutoecoleComponent,
    SidebarComponent,
    HomeAdminComponent,
    ElevesAutoecoleComponent,
    ScoresEleveComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }