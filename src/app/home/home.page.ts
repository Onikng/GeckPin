import { Component,OnInit } from '@angular/core';
import {Route, Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/managers/StorageService';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private router:Router, private route: ActivatedRoute, private storageService: StorageService) {}

  user: string='';

async ngOnInit(){
  this.user = await this.storageService.get('user');
    if (!this.user) {
      // Redirigir a la página de login si no hay sesión activa
      this.router.navigate(['/login']);
    }
}

  Onbtnreturn(){
    this.router.navigate(['/login'])
    }

  
  OnCardPinClick(){
    this.router.navigate(['/detail'])
  }

  OnHomeClick(){
    this.router.navigate(['/home'])
}

OnAddFileClick(){
    this.router.navigate(['/addfile'])
}

OnLibraryClick(){
    this.router.navigate(['/library'])
}

OnProfileClick(){
    this.router.navigate(['/profile'])
}
  
}
