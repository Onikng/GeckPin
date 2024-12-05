import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/managers/StorageService';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user:any;
  constructor(private router:Router, private storageService: StorageService) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.user = await this.storageService.get('user');
    if (!this.user) {
      console.log('No se encontraron datos del usuario.');
    }
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

  OnLibraryClick(){
      this.router.navigate(['/library'])
  }

  OnProfileClick(){
      this.router.navigate(['/profile'])
  }

  OnAdminclick(){
    this.router.navigate(['/adminprofile'])
  }
}