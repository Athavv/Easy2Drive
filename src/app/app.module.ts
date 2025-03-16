import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ListElevesComponent } from './admin/list-eleves/list-eleves.component';
import { AddElevesComponent } from './admin/add-eleves/add-eleves.component';
import { EditElevesComponent } from './admin/edit-eleves/edit-eleves.component';

@NgModule({
  declarations: [
    AppComponent,
    ListElevesComponent,
    AddElevesComponent,
    EditElevesComponent,
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
