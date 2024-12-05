import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class PosteosUseCase {

  constructor(
    private firestore: AngularFirestore,
  ) {}

  async performPostRegistration(
    PhotoURL: string,
    descripcion: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      if (!PhotoURL || !descripcion.trim()) {
        throw new Error('Datos incompletos: PhotoURL o descripcion no válidos.');
      }
  
      const postData = {
        photoURL: PhotoURL,
        descripcion: descripcion,
        createdAt: new Date().toISOString(), // Timestamp
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
      return { success: true, message: "Post actualizado con éxito" };
    } catch (error: any) {
      console.error('Error al actualizar el Post:', error);
      return { success: false, message: 'Error al actualizar el Post. Por favor, inténtelo de nuevo.' };
    }
  }

  async deletePost(PostId: string): Promise<{ success: boolean; message: string }> {
    try {
      // eliminar el documento
      await this.firestore.collection('Posts').doc(PostId).delete();
      return { success: true, message: 'Post eliminado con éxito' };
    } catch (error: any) {
      console.error('Error al eliminar Post:', error);
      return { success: false, message: 'Error al eliminar Post. Por favor, inténtelo de nuevo.' };
    }
  }


}