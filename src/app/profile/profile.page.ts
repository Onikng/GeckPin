import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/managers/StorageService';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private router:Router, private route: ActivatedRoute, private storageService: StorageService) { }

  user:any;

  async ionViewDidEnter() {
    this.user = await this.storageService.get('user');
    if (!this.user) {
      console.log('No se encontraron datos del usuario.');
    }
  }

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

  OnLibraryClick(){
      this.router.navigate(['/library'])
  }

  OnProfileClick(){
      this.router.navigate(['/profile'])
  }
}