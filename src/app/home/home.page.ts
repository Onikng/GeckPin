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

  user: any;

async ngOnInit(){}
  

async ionViewDidEnter() {
    this.user = await this.storageService.get('user');
    if (!this.user) {
      console.log('No se encontraron datos del usuario.');
    }
  }


  Onbtnreturn(){
    this.router.navigate(['/login'])
    }

  
  OnCardPinClick(selectedItem: any) {
      this.router.navigate(['/detail'], {
        queryParams: { data: JSON.stringify(selectedItem) },
        });
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
