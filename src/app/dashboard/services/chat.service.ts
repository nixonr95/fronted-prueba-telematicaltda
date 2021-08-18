import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../auth/interfaces/auth.interfaces';
import { Mensaje } from '../interfaces/dashboard.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl: string = environment.baseUrl;
  private _usuarios!: Usuario[];

  

  constructor(private http: HttpClient) { }

  obtenerUsuarios() {
    return this.http.get<any>(`${this.baseUrl}/auth`);
  }

  obtenerMensajesRecibidos(uid: string) {
    return this.http.get<any>(`${this.baseUrl}/messages/${uid}` );
  }

  enviarMensaje(mensaje: Mensaje) {
    return this.http.post<any>(`${this.baseUrl}/messages`, mensaje);
  }

}
