import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Mensaje } from '../../interfaces/dashboard.interfaces';
import { ChatService } from '../../services/chat.service';
import { Usuario } from '../../../auth/interfaces/auth.interfaces';

@Component({
  selector: 'app-mensajes-enviados',
  templateUrl: './mensajes-enviados.component.html',
  styles: [
  ]
})
export class MensajesEnviadosComponent implements OnInit {

  mensajes!: Mensaje[];
  mensajesEnviados: any[] = [];
  usuarios!: Usuario[];
  usuarioEmisor!: any;

  get usuario() {
    return this.authService.usuario;
  } 

  constructor(private chatService: ChatService,
              private authService: AuthService) { }

  ngOnInit(): void {
    // this.chatService.obtenerUsuarios()
    //   .subscribe(resp => {
    //     this.usuarios = resp
    //     console.log(this.usuarios)
    //   });

    
      // .subscribe(resp => {
      //   console.log(resp)
      // })
    // this.usuarioEmisor = this.chatService.obtenerUsuarioPorUid('611d20e9cca79f00165ad93f')

    this.chatService.obtenerMensajesEnviados(this.usuario.uid)
      .subscribe( resp => {
        this.mensajes = resp;
        this.mensajes.forEach(mensaje => {
          this.chatService.obtenerUsuarioPorUid(mensaje.uidReceptor)
            .subscribe(resp => {
              this.mensajesEnviados.push({
                mensaje,
                nombreReceptor: resp
              })
            })
        })
        console.log(this.mensajesEnviados)
      })
  }

}
