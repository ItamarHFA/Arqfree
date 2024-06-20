import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { DiagnosticoProyectoComponent } from './pages/diagnosticoproyecto/diagnostico-proyecto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgradecimientoComponent } from './pages/agradecimiento/agradecimiento.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    DiagnosticoProyectoComponent,
    AgradecimientoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
