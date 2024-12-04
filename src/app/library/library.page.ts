import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {

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

    // Función para abrir una biblioteca
  openLibrary(libraryName: string) {
    alert(`Abriendo biblioteca: ${libraryName}`);
    // Aquí puedes usar el router para navegar a una página específica
    // Por ejemplo: this.router.navigate([`/library/${libraryName}`]);
  }

  // Función para crear una nueva biblioteca
  createNewLibrary() {
    const libraryName = prompt('Ingresa el nombre de la nueva biblioteca:');
    if (libraryName) {
      alert(`Nueva biblioteca creada: ${libraryName}`);
      // Aquí puedes implementar lógica para guardar la nueva biblioteca
      // como actualizar un array local o llamar a un servicio de backend
    }
  }
}
