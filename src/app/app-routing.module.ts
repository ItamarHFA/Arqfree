import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiagnosticoProyectoComponent } from './pages/diagnosticoproyecto/diagnostico-proyecto.component';
import { AgradecimientoComponent } from './pages/agradecimiento/agradecimiento.component';

const routes: Routes = [
  {path: 'diagnostico', component: DiagnosticoProyectoComponent},
  {path: 'diagnostico', component: AgradecimientoComponent},
  { path: '**', redirectTo: 'diagnostico', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
