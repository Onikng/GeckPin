import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserLogoutUseCase } from '../use-cases/user-logout.user-case';
import { UserUpdateUseCase } from '../use-cases/user-update.use-case';
import { StorageService } from 'src/managers/StorageService';
import { CancelAlertService } from 'src/managers/CancelAlertService';
@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.page.html',
  styleUrls: ['./adminprofile.page.scss'],
})
export class AdminprofilePage implements OnInit {

user:any;

  constructor(private navCtrl: NavController, 
    private router: Router,
    private userLogoutUseCase: UserLogoutUseCase,
    private userUpdateUseCase: UserUpdateUseCase,
    private storageService: StorageService,
    private cancelAlertService: CancelAlertService
) { }

  ngOnInit() {
  }

  Onbtnreturn(){
  this.router.navigate(['/home'])
  }

  OnHomeClick(){
    this.router.navigate(['/home'])
}

OnAddFileClick(){
    this.router.navigate(['/addfile'])
}

OnProfileClick(){
    this.router.navigate(['/profile'])
}
  async OnLogoutButtonPressed() {
    this.cancelAlertService.showAlert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      async () => {
        this.userLogoutUseCase.performLogout();
        this.router.navigate(['/splash']);
      },
      () => { }
    );
  }

  async onDeleteAccountButtonPressed() {
    // obtener el user logeado del storageservice
    this.user = await this.storageService.get('user');
    // verificar que haya user y uid
    if (this.user && this.user.uid) {
    // extraer el uid del usuario
      const uid = this.user.uid; 
    // enviar el uid al caso de uso de delete account  
      const result = await this.userUpdateUseCase.performDeleteAccount(uid);

      if (result.success) {
        this.cancelAlertService.showAlert(
          'Eliminación Exitosa',
          'Tu cuenta ha sido eliminada correctamente.',
          () => {
            this.router.navigate(['/login']); 
          }
        );
      } else {
        this.cancelAlertService.showAlert(
          'Error',
          result.message,
          () => { }
        );
      }
    } else {
      this.cancelAlertService.showAlert(
        'Error',
        'No se pudo obtener la información del usuario.',
        () => { }
      );
    }
  }
}

