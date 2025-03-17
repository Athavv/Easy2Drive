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
import { AddAutoEcolesComponent } from './admin/auto-ecoles/add-auto-ecoles/add-auto-ecoles.component';
import { ListAutoEcolesComponent } from './admin/auto-ecoles/list-auto-ecoles/list-auto-ecoles.component';
import { EditAutoEcolesComponent } from './admin/auto-ecoles/edit-auto-ecoles/edit-auto-ecoles.component';

@NgModule({
  declarations: [
    AppComponent,
    ListElevesComponent,
    AddElevesComponent,
    EditElevesComponent,
    AddAutoEcolesComponent,
    ListAutoEcolesComponent,
    EditAutoEcolesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
