import { Component, OnInit } from '@angular/core';
import {Route, Router} from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';
//Importación StorageService
import { StorageService } from 'src/managers/StorageService';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
//Creación Instanacia StorageService
  constructor(private router: Router, private sessionManager: SessionManager, private storageService: StorageService) { }

  user: string = '';
  password: string= '';

  ngOnInit() {
  }

  Onbtnreturn(){
    this.router.navigate(['/splash'])
    }

  async onLoginButtonPressed(){
    if(this.sessionManager.performLogin(this.user, this.password)){
      //Implementación StorageService
      await this.storageService.set('isSessionActive', true);
      await this.storageService.set('user', this.user);
      this.router.navigate(['/home'], {queryParams:{user: this.user}})
    }else{
      this.user=''
      this.password=''
      alert('Las credenciales ingresadas son inválidas.')
    }
  }

  onRegisterLinkPressed(){
    this.router.navigate(['/register'])
  }

}
