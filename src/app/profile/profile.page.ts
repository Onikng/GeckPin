import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private router:Router) { }

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