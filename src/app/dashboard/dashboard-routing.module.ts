import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { PublicacionesComponent } from './pages/publicaciones/publicaciones.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: [
    {path: '', component: PublicacionesComponent},
    {path: 'mensajes', component: MensajesComponent},
    {path: '**', redirectTo: ''},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
