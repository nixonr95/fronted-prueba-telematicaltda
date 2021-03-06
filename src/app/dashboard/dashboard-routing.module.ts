import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { MensajesEnviadosComponent } from './pages/mensajes-enviados/mensajes-enviados.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: [
    {path: 'mensajes-enviados', component: MensajesEnviadosComponent},
    {path: 'mensajes', component: MensajesComponent},
    {path: '**', redirectTo: 'mensajes-enviados'},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
