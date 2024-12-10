import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PosteosUseCase } from '../use-cases/Posteos.use-case';
import { CancelAlertService } from 'src/managers/CancelAlertService';
import { ImageService } from 'src/managers/image-service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-addfile',
  templateUrl: './addfile.page.html',
  styleUrls: ['./addfile.page.scss'],
})
export class AddfilePage implements OnInit {
  userId: string = '';
  PhotoURL: string = '';
  descripcion: string = '';

  constructor(
    private postUseCase: PosteosUseCase,
    private navCtrl: NavController,
    private router: Router,
    private alert: CancelAlertService,
    private imageService: ImageService,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {}

  Onbtnreturn() {
    this.router.navigate(['/splash']);
  }

  OnHomeClick() {
    this.router.navigate(['/home']);
  }

  OnAddFileClick() {
    this.router.navigate(['/addfile']);
  }

  OnProfileClick() {
    this.router.navigate(['/profile']);
  }

  async onAddPostButtonPressed() {
    console.log('Datos antes de guardar:', {
      PhotoURL: this.PhotoURL,
      descripcion: this.descripcion,
    });

    // Validar que los campos necesarios estén llenos
    if (!this.PhotoURL || !/^https?:\/\/.+/.test(this.PhotoURL)) {
      this.alert.showAlert('Error', 'Debes agregar una imagen válida antes de publicar.', () => {});
      console.error('PhotoURL inválido:', this.PhotoURL);
      return;
    }

    if (!this.descripcion || !this.descripcion.trim()) {
      this.alert.showAlert('Error', 'La descripción no puede estar vacía.', () => {});
      console.error('Descripción inválida:', this.descripcion);
      return;
    }

    try {
      const result = await this.postUseCase.performPostRegistration(
        this.userId,
        this.PhotoURL,
        this.descripcion
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
    console.log('Formulario limpiado: PhotoURL y descripcion vaciados.');
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
              this.PhotoURL = uploadResult.imageUrl; // actualiza el enlace de la imagen
              console.log('Imagen tomada desde la cámara:', this.PhotoURL);
            } else {
              console.error('Error al tomar imagen desde la cámara.');
            }
          },
        },
        {
          text: 'Imágenes',
          icon: 'image',
          handler: async () => {
            const uploadResult = await this.imageService.getImageFromGallery();
            if (uploadResult.success && uploadResult.imageUrl) {
              this.PhotoURL = uploadResult.imageUrl; // actualiza el enlace de la imagen
              console.log('Imagen seleccionada desde la galería:', this.PhotoURL);
            } else {
              console.error('Error al seleccionar imagen desde la galería.');
            }
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Selección de imagen cancelada.');
          },
        },
      ],
    });
    await actionSheet.present();
  }
}
