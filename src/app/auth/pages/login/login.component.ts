import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  miFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder,
              private autService: AuthService,
              private router: Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  entrar() {
    if(this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return
    }
    if( !this.miFormulario.errors ){
      this.autService.loginUsuario(this.miFormulario.get('email')?.value, this.miFormulario.get('password')?.value)
        .subscribe( resp => {
          if ( resp.ok ) {
            localStorage.setItem('token', resp.token! );
            this.router.navigateByUrl('/dashboard')
          }
        }, err => {
          this._snackBar.open(err.error.msg, 'Ok', {
            duration: 3000,
            verticalPosition: 'top'
          });
        } )
    }
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched
  }

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;
    if( errors?.required ) {
      return 'Email es obligatorio'
    } else if ( errors?.pattern ) {
      return 'El valor ingresado no tiene formato de correo'
    }

    return ''
  }

}
