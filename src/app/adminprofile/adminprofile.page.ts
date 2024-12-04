import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.page.html',
  styleUrls: ['./adminprofile.page.scss'],
})
export class AdminprofilePage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  Onbtnreturn(){
  this.router.navigate(['/home'])
  }

}

