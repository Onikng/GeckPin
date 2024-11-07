import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginUseCase } from '../use-cases/user-login.use-case';
import { CancelAlertService } from 'src/managers/CancelAlertService';

//Importación StorageService
import { StorageService } from 'src/managers/StorageService';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
//Creación Instanacia StorageService
  constructor(private router: Router, private storageService: StorageService,private userLoginUseCase: UserLoginUseCase, private alert: CancelAlertService) { }

  email: string = '';
  password: string= '';

  ngOnInit() {
  }

  Onbtnreturn(){
    this.router.navigate(['/splash'])
    }

    async onLoginButtonPressed() {
      const result = await this.userLoginUseCase.performLogin(this.email, this.password);
  
      if (result.success) {
        this.alert.showAlert(
          'Login exitoso',
          'Has iniciado sesión correctamente.',
          () => {
            this.router.navigate(['/home']); // Navegar a inicio cuando el login sea exitoso
          }
        );
      } else {
        this.alert.showAlert(
          'Error',
          result.message,
          () => {
            this.router.navigate(['/splash']); 
          }
        );
      }
    }

  onRegisterLinkPressed(){
    this.router.navigate(['/register'])
  }

}
