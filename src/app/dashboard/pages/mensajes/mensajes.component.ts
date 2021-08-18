import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Mensaje } from '../../interfaces/dashboard.interfaces';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  mensajes!: Mensaje[];

  get usuario() {
    return this.authService.usuario;
  } 

  constructor(private chatService: ChatService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.chatService.obtenerMensajesRecibidos(this.usuario.uid)
      .subscribe( resp => {
        this.mensajes = resp.mensajes;
      })
  }

}
