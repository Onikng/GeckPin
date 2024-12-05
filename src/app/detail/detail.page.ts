import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  selectedItem:any;

  constructor(private router:Router, private route: ActivatedRoute, private firestore: AngularFirestore) { }

  ngOnInit() {
    // Recoge los datos del elemento seleccionado desde el home
    const postId = this.route.snapshot.paramMap.get('postId');
    if (postId) {
      this.loadPost(postId);
    }
  }

  loadPost(postId: string) {
    // Buscar el documento en Firestore usando el `postId`
    this.firestore
      .collection('Posts')
      .doc(postId)
      .valueChanges()
      .subscribe((data) => {
        if (data) {
          this.selectedItem = data; // Asignar los datos del post
          console.log('Post cargado:', this.selectedItem);
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

