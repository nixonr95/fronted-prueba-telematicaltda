import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from '../../../auth/interfaces/auth.interfaces';
import { Mensaje } from '../../interfaces/dashboard.interfaces';
import { AuthService } from '../../../auth/services/auth.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-enviar-mensaje',
  templateUrl: './enviar-mensaje.component.html',
  styles: [
  ]
})
export class EnviarMensajeComponent implements OnInit {

  mensaje!: Mensaje;

  miFormulario: FormGroup = this.fb.group({
    message: ['', Validators.required]
  })

  get usuario () {
    return this.authService.usuario;
  }


  constructor(private dialogRef: MatDialogRef<EnviarMensajeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Usuario,
              private fb: FormBuilder,
              private authService: AuthService,
              private chatService: ChatService) { }

  ngOnInit(): void {
  }

  enviar() {
    this.mensaje = {
      message: this.miFormulario.get('message')?.value,
      nombreEmisor: this.usuario.name,
      uidEmisor: this.usuario.uid,
      uidReceptor: this.data.uid
    }

    this.chatService.enviarMensaje(this.mensaje)
      .subscribe(resp => {
        console.log(resp)
      } )

    this.dialogRef.close();
  }

}
