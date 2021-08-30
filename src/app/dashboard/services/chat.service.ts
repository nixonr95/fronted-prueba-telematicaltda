import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../auth/interfaces/auth.interfaces';
import { Mensaje } from '../interfaces/dashboard.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl: string = environment.baseUrl;
  private _usuarios!: Usuario[];
  private _usuarioByUid!: string;

  constructor(private http: HttpClient) { }

  obtenerUsuarios() {
    return this.http.get<any>(`${this.baseUrl}/auth`);
  }

  obtenerUsuarioPorUid(uid: string) {
    return this.obtenerUsuarios()
      .pipe(
        map(resp => {
          this._usuarios = resp.usuarios
          this._usuarios.forEach( usuario => {
            if( usuario.uid === uid) {
              this._usuarioByUid = usuario.name
            }
          })
          return this._usuarioByUid;
        })
      )
    
    
  }

  obtenerMensajesRecibidos(uid: string) {
    return this.http.get<any>(`${this.baseUrl}/messages/${uid}`);
  }

  obtenerMensajesEnviados(uid: string) {
    return this.http.get<any>(`${this.baseUrl}/messages/enviados/${uid}`)
            .pipe(
              map(resp => resp.mensajes)
            )
  }

  enviarMensaje(mensaje: Mensaje) {
    return this.http.post<any>(`${this.baseUrl}/messages`, mensaje);
  }

}
