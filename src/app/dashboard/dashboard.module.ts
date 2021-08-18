import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TarjetaPublicidadComponent } from './components/tarjeta-publicidad/tarjeta-publicidad.component';
import { MaterialModule } from '../material/material/material.module';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { EnviarMensajeComponent } from './components/enviar-mensaje/enviar-mensaje.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PublicacionesComponent } from './pages/publicaciones/publicaciones.component';


@NgModule({
  declarations: [
    DashboardComponent,
    TarjetaPublicidadComponent,
    MensajesComponent,
    EnviarMensajeComponent,
    PublicacionesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
