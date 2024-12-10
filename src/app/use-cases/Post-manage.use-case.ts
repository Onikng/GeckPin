import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';  
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getAuth } from 'firebase/auth';



export interface Post {
  postId?: string; // ID opcional
    descripcion: string;
    photoURL: string;
    uid: string;
    createdAt: Date;
  }

@Injectable({
  providedIn: 'root',
})
export class PostManageUseCase {
  constructor(private firestore: AngularFirestore) {}

  // Método para obtener todos las publicaciones por id
  getPosts(): Observable<Post[]> {
    const auth = getAuth();
    const currentUser = auth.currentUser;
  
    if (!currentUser) {
       console.error('Usuario no autenticado');
      return new Observable<Post[]>();
    }
  
    return this.firestore
      .collection('Posts', (ref) => ref.where('uid', '==', currentUser.uid))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Post;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  // Método para obtener todos los eventos sin filtrar por usuario
  getAllPosts(): Observable<Post[]> {
    return this.firestore
      .collection('Posts') // No se aplica filtro alguno
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Post;
            const id = a.payload.doc.id;
            return { id, ...data }; // Combina el ID con los datos del evento
          })
        )
      );
  }

  updatePosts(postId: string, data: Partial<Post>): Promise<void> {
    return this.firestore.collection('Posts').doc(postId).update(data);
  }
  
  // Método para eliminar un evento por su id
  async deletePosts(postId: string): Promise<{ success: boolean; message: string }> {
    try {
      await this.firestore.collection('Posts').doc(postId).delete();
      return { success: true, message: 'Post eliminado con éxito' };
    } catch (error: any) {
      return { success: false, message: `Error al eliminar el post: ${error.message}` };
    }
  }
}