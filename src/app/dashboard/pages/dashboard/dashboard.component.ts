import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { ChatService } from '../../services/chat.service';
import { Usuario } from '../../../auth/interfaces/auth.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { EnviarMensajeComponent } from '../../components/enviar-mensaje/enviar-mensaje.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usuarios!: Usuario[];

  get usuario() {
    return this.authService.usuario;
  }

  constructor(private router: Router,
              private authService: AuthService,
              private chatService: ChatService,
              public dialog: MatDialog) { 
              }

  ngOnInit(): void {
    this.chatService.obtenerUsuarios()
      .subscribe( resp => {
        this.usuarios = resp.usuarios;
        this.usuarios.forEach((element, i) => {
          if(element.uid === this.usuario.uid) {
            this.usuarios.splice(i, 1)
          }
        });
      });
  }

  logout() {

    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }

  enviarMensaje(user: Usuario) {
    const dialog = this.dialog.open(EnviarMensajeComponent, {
      width: '500px',
      data: user
    })

    // dialog.afterClosed().subscribe(
    //   (result) => {
    //     if (result) {
    //       this.heroesService.borrarHeroe(this.heroe.id!)
    //         .subscribe( resp => {
    //           this.router.navigate(['/heroes']);
    //         })
    //     }
    //   }
    // )
  }

}
