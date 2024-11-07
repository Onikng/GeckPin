import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserRegistrationUseCase } from '../use-cases/user-registration.use-case';
import { CancelAlertService } from 'src/managers/CancelAlertService';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string = '';
  password: string = '';
  nombreusuario: string = '';
  

  constructor(
    private userRegistrationUseCase: UserRegistrationUseCase,
    private navCtrl: NavController, 
    private router: Router,
    private alert: CancelAlertService
  ) { }

  ngOnInit() {
  }


  Onbtnreturn(){
    this.router.navigate(['/login'])
    }
    async onRegisterButtonPressed() {
      // Llama al caso de uso para manejar el registro
      const result = await this.userRegistrationUseCase.performRegistration(this.email, this.password, this.nombreusuario);
       // Si hay un mensaje de éxito, navega a otra vista
       if (result.success) {
        this.alert.showAlert(
          'Registro exitoso',
          'Gracias por registrarte en GeckPin',
          () => {
            this.router.navigate(['/login']);
          }
        );
      } else {
        // Muestra el error proporcionado por el caso de uso
        this.alert.showAlert(
          'Error',
          result.message,
          () => {
            this.clean();
          }
        );
      }
    }
  
    clean() {
      this.email = '';
      this.password = '';
      this.nombreusuario= '';
    }
}








