import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {

  loginForm!: FormGroup;
  hidePassword!: true;

  constructor() { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    
  }
    togglePasswordVisibility() {
      this.hidePassword= this.hidePassword;
    }

  login() {
    if (this.loginForm.valid) {
      // Obtener los valores del formulario
      const username = this.loginForm.get('username')!.value;
      const password = this.loginForm.get('password')!.value;

      // Aquí puedes agregar la lógica para autenticar al usuario
      if (username === 'usuario' && password === 'contraseña') {
        // Usuario autenticado correctamente
        console.log('Inicio de sesión exitoso');
        // Aquí puedes redirigir al usuario a otra página
      } else {
        // Credenciales inválidas
        console.log('Inicio de sesión fallido');
      }
    }
  } 

  signUpForm = this.formBuilder.group(
    {
      name : ['',[Validators.required, Validators.minLength(3)]],
      username : ['',[Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      birthdate : ['',[Validators.required]],
      password : ['',[Validators.required,
                      Validators.minLength(6),
                      Validators.maxLength(16),]],
      gender : ['',[Validators.required]],
      phone : ['',[Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]+')]],
      email : ['',[Validators.required, Validators.email]],
    }
  );

  get passwordIconColor(): string {
    return this.hidePassword ? '' : 'primary';
  }

  get passwordInputType(): string {
    return this.hidePassword ? 'password' : 'text';
  }
  

}
