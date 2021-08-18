import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
 

  miFormulario: FormGroup = this.fb.group({
    usuario: ['', [Validators.required, Validators.pattern(this.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    contraseña: ['', [Validators.required, Validators.minLength(6)]],
    contraseña2: ['', [Validators.required]],
  }, {
    validators: [this.camposIguales('contraseña', 'contraseña2')]
  })

  constructor(private fb: FormBuilder,
              private autService: AuthService,
              private router: Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  crearUsuario() {
    if(this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return
    }
    if( !this.miFormulario.errors ){
      
      this.autService.registrarUsuario(this.miFormulario.get('usuario')?.value, this.miFormulario.get('email')?.value,
        this.miFormulario.get('contraseña')?.value)
        .subscribe( resp => {
          if(resp.ok === true) {
            this.router.navigateByUrl('/dashboard')
          }
        }, err => {
          this._snackBar.open(err.error.msg, 'Ok', {
            duration: 3000,
            verticalPosition: 'top'
          });
        });

      this.miFormulario.reset({
        usuario: '',
        email: '',
        contraseña: '',
        contraseña2: ''
      })
    }
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched
  }

  camposIguales(campo1: string, campo2: string) {

    return (formGroup: AbstractControl): ValidationErrors | null => {
      
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      if( pass1 !== pass2) {
        formGroup.get(campo2)?.setErrors({noIguales: true});
        return {noIguales: true}
      } 

      formGroup.get(campo2)?.setErrors(null);

      return null
    }
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
