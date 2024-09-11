import { Component, OnInit } from '@angular/core';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  Onbtnreturn(){
    this.router.navigate(['/login'])
    }
  onRegisterButtonPressed(){
  this.router.navigate(['/login'])
  }
}




