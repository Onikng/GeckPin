import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class PosteosUseCase {
  constructor(private firestore: AngularFirestore) {}

  async performPostRegistration(
    PhotoURL: string | null,
    descripcion: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Validar PhotoURL y descripcion
      if (!PhotoURL || !/^https?:\/\/.+/.test(PhotoURL)) {
        throw new Error('PhotoURL no es una URL válida.');
      }

      if (!descripcion || !descripcion.trim()) {
        throw new Error('Descripción no puede estar vacía.');
      }

      // Obtener el usuario actual
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        throw new Error('Usuario no autenticado');
      }

      const postData = {
        userId: currentUser.uid,
        photoURL: PhotoURL,
        descripcion: descripcion,
        createdAt: new Date().toISOString(), // Timestamp
        postId: this.firestore.createId(),
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
}
