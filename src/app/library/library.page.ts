import { Component, OnInit } from '@angular/core';
import { PosteosUseCase } from '../use-cases/Posteos.use-case';
import { UserLoginUseCase } from '../use-cases/user-login.use-case';
import { Router } from '@angular/router';
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

  constructor(
    private postUseCase: PosteosUseCase,
    private userLoginUseCase: UserLoginUseCase,
    private router:Router
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
