import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  selectedItem:any;

  constructor(private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // Recoge los datos del elemento seleccionado desde el home
    this.route.queryParams.subscribe((params) => {
      if (params && params['data']) {
        this.selectedItem = JSON.parse(params['data']);
      }
    });
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

    viewFeed() {
      alert('Navegando al feed...');
    }
  
    saveItem() {
      alert('Item guardado con éxito.');
    }
  
    shareItem() {
      alert('Compartiendo...');
    }
  
    suggestMore() {
      alert('Te mostrando contenido similar...');
    }
}

