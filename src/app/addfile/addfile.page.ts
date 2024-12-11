import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PosteosUseCase } from '../use-cases/Posteos.use-case';
import { CancelAlertService } from 'src/managers/CancelAlertService';
import { ImageService } from 'src/managers/image-service';
import { ActionSheetController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-addfile',
  templateUrl: './addfile.page.html',
  styleUrls: ['./addfile.page.scss'],
})
export class AddfilePage implements OnInit {
  uid: string = '';
  PhotoURL: string = '';
  descripcion: string = '';
  postId:string = '';

  constructor(
    private postUseCase: PosteosUseCase,
    private router: Router,
    private alert: CancelAlertService,
    private imageService: ImageService,
    private actionSheetController: ActionSheetController,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.loadUserId();
  }

  async loadUserId() {
    const user = await this.afAuth.currentUser;
    if (user) {
      this.uid = user.uid;
    } else {
      console.error('No hay un usuario logeado.');
    }
  }

  Onbtnreturn() {
    this.router.navigate(['/splash']);
  }

  

  async onAddPostButtonPressed() {
    console.log('Datos antes de guardar:', {
      PhotoURL: this.PhotoURL,
      descripcion: this.descripcion,
    });

    if (!this.PhotoURL) {
      this.alert.showAlert('Error', 'Debes agregar una imagen antes de publicar.', () => {});
      return;
    }

    if (!this.descripcion || !this.descripcion.trim()) {
      this.alert.showAlert('Error', 'La descripción no puede estar vacía.', () => {});
      return;
    }

    try {
      const result = await this.postUseCase.performPostRegistration(
        this.PhotoURL,
        this.descripcion,
        this.uid,
        this.postId
      );

      if (result.success) {
        this.alert.showAlert('Éxito', 'Post agregado exitosamente.', () => {
          this.router.navigate(['/home']);
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error al guardar el post:', error);
      this.alert.showAlert('Error', 'No se pudo guardar el post.', () => {});
    }
  }

  clean() {
    this.PhotoURL = '';
    this.descripcion = '';
    console.log('Formulario limpiado.');
  }

  async onAddImagePressed() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Selecciona una opción',
      buttons: [
        {
          text: 'Cámara',
          icon: 'camera',
          handler: async () => {
            const uploadResult = await this.imageService.getImageFromCamera();
            if (uploadResult.success && uploadResult.imageUrl) {
              this.PhotoURL = uploadResult.imageUrl;
            }
          },
        },
        {
          text: 'Imágenes',
          icon: 'image',
          handler: async () => {
            const uploadResult = await this.imageService.getImageFromGallery();
            if (uploadResult.success && uploadResult.imageUrl) {
              this.PhotoURL = uploadResult.imageUrl;
            }
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
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
