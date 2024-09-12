import { Component,OnInit } from '@angular/core';
import {Route, Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private router:Router, private route: ActivatedRoute) {}

  user: string='';

ngOnInit(){
  this.route.queryParams.subscribe(params => {
    this.user = params['user'] || null;
  })}

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
