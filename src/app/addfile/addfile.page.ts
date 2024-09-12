import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addfile',
  templateUrl: './addfile.page.html',
  styleUrls: ['./addfile.page.scss'],
})
export class AddfilePage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  Onbtnreturn(){
    this.router.navigate(['/splash'])
    }
}
