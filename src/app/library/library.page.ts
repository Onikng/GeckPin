import { Component, OnInit } from '@angular/core';
import { PosteosUseCase } from '../use-cases/Posteos.use-case';
import { UserLoginUseCase } from '../use-cases/user-login.use-case';
import { PreloadingStrategy, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {
  uid: string = '';
  userPosts: any[] = [];
  isLoading: boolean = true;
  error: string = '';
  postId:string = '';

  constructor(
    private postUseCase: PosteosUseCase,
    private userLoginUseCase: UserLoginUseCase,
    private router:Router,
    private alertController:AlertController
  ) {}

  async ngOnInit() {
    try {
      this.uid = await this.userLoginUseCase.getCurrentUserId(); // Obtener el ID del usuario logeado
      this.userPosts = await this.postUseCase.getUserPosts(this.uid); // Obtener los posts
    } catch (err) {
      console.error(err);
      this.error = 'No se pudieron cargar los posts.';
    } finally {
      this.isLoading = false;
    }
  }

  async onEditPost(postId: string, currentData: { descripcion: string }) {
    const alert = await this.alertController.create({
      header: 'Editar Post',
      inputs: [
        {
          name: 'descripcion',
          type: 'text',
          value: currentData.descripcion, // Mostrar la descripción actual en el campo de entrada
          placeholder: 'Nueva descripción',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: async (data) => {
            if (data.descripcion && data.descripcion.trim()) {
              try {
                // Llamar al método updatePost del caso de uso
                const updatedData = { descripcion: data.descripcion };
                const result = await this.postUseCase.updatePost(postId, updatedData);
  
                if (result.success) {
                  console.log('Post actualizado con éxito:', result.message);
                  // Refrescar los posts del usuario después de actualizar
                  this.userPosts = await this.postUseCase.getUserPosts(this.uid);
                } else {
                  console.error('Error al actualizar el post:', result.message);
                }
              } catch (error) {
                console.error('Error al intentar actualizar el post:', error);
              }
            } else {
              console.error('La descripción no puede estar vacía.');
            }
          },
        },
      ],
    });
  
    await alert.present();
  }



  async onDeleteClick(postId: string) {
    const alert = await this.alertController.create({
      header: 'Eliminar Post',
      message: '¿Estás seguro de que deseas eliminar este post?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              // Llamar al método deletePost del caso de uso
              const result = await this.postUseCase.deletePost(postId);
              if (result.success) {
                // Actualizar la lista de posts después de eliminar
                this.userPosts = await this.postUseCase.getUserPosts(this.uid);
                console.log('Post eliminado correctamente');
              } else {
                console.error(result.message);
              }
            } catch (err) {
              console.error('Error al eliminar el post:', err);
            }
          },
        },
      ],
    });
  
    await alert.present();
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
}
