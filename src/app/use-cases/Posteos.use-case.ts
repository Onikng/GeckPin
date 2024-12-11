import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class PosteosUseCase {
  constructor(private firestore: AngularFirestore) {}

  async performPostRegistration(
    PhotoURL: string,
    descripcion: string,
    uid: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      if (!PhotoURL || !descripcion.trim()) {
        throw new Error('Datos incompletos: PhotoURL o descripcion no válidos.');
      }

      const postData = {
        photoURL: PhotoURL,
        descripcion: descripcion,
        createdAt: new Date().toISOString(),
        postId: this.firestore.createId(),
        uid: uid,
      };

      console.log('Datos que se intentan guardar en Firestore:', postData);

      // Guardar el documento en Firestore
      await this.firestore.collection('Posts').add(postData);

      return { success: true, message: 'Post agregado con éxito' };
    } catch (error: any) {
      console.error('Error al guardar en Firestore:', error);
      return {
        success: false,
        message: error.message || 'Error al guardar los datos en Firestore.',
      };
    }
  }

  async updatePost(PostId: string, updatedData: any): Promise<{ success: boolean; message: string }> {
    try {
      await this.firestore.collection('Posts').doc(PostId).update(updatedData);
      return { success: true, message: 'Post actualizado con éxito' };
    } catch (error: any) {
      console.error('Error al actualizar el Post:', error);
      return { success: false, message: 'Error al actualizar el Post. Por favor, inténtelo de nuevo.' };
    }
  }

  async deletePost(PostId: string): Promise<{ success: boolean; message: string }> {
    try {
      await this.firestore.collection('Posts').doc(PostId).delete();
      return { success: true, message: 'Post eliminado con éxito' };
    } catch (error: any) {
      console.error('Error al eliminar Post:', error);
      return { success: false, message: 'Error al eliminar Post. Por favor, inténtelo de nuevo.' };
    }
  }

  async getUserPosts(userId: string): Promise<any[]> {
    try {
      const postsSnapshot = await this.firestore
        .collection('Posts', (ref) => ref.where('uid', '==', userId))
        .get()
        .toPromise();

      if (!postsSnapshot?.docs.length) {
        return [];
      }

      return postsSnapshot.docs.map((doc) => {
        const data = doc.data() as Record<string, any>;
        return { id: doc.id, ...data };
      });
    } catch (error) {
      console.error('Error al obtener los posts del usuario:', error);
      throw new Error('No se pudieron obtener los posts del usuario.');
    }
  }
}
