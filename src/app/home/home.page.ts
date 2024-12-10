import { Component,OnInit } from '@angular/core';
import {Route, Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/managers/StorageService';
import { AngularFirestore } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  posts: any[] = [];

  constructor(private router:Router, private firestore: AngularFirestore, private route: ActivatedRoute, private storageService: StorageService) {}

  user: any;

async ngOnInit(){
  this.loadPosts();
}
  


loadPosts() {
  this.firestore
    .collection('Posts', (ref) => ref.orderBy('createdAt', 'desc'))
    .snapshotChanges()
    .subscribe((changes) => {
      this.posts = changes.map((change) => ({
        id: change.payload.doc.id, // ID del documento
        ...change.payload.doc.data() as any, // Datos del documento
      }));
      console.log('Publicaciones cargadas:', this.posts);
    });
}

async ionViewDidEnter() {
    this.user = await this.storageService.get('user');
    if (!this.user) {
      console.log('No se encontraron datos del usuario.');
    }
  }


  navigateToDetail(postId: string) {
    this.router.navigate(['/detail', postId]);
  }

  OnCardPinClick() {
      this.router.navigate(['/detail']);
  }

  OnHomeClick(){
    this.router.navigate(['/home'])
}

OnAddFileClick(){
    this.router.navigate(['/addfile'])
}

OnProfileClick(){
    this.router.navigate(['/profile'])
}
  
}
