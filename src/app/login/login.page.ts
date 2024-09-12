import { Component, OnInit } from '@angular/core';
import {Route, Router} from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private sessionManager: SessionManager) { }

  user: string = '';
  password: string= '';

  ngOnInit() {
  }

  Onbtnreturn(){
    this.router.navigate(['/splash'])
    }

  onLoginButtonPressed(){
    if(this.sessionManager.performLogin(this.user, this.password)){
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
